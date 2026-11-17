import { useEffect, useRef, useState } from 'react';
import type { FormEvent, KeyboardEvent, ReactNode } from 'react';
import type { CategoryId } from '../data/projects';
import { CLEAR, completeCommand, runCommand, type TerminalActions } from '../lib/terminal';

type Token = { text: string; cls?: 'kw' | 'prop' | 'str' };

const CODE_LINES: Token[][] = [
  [{ text: 'const', cls: 'kw' }, { text: ' developer = {' }],
  [{ text: '  ' }, { text: 'name', cls: 'prop' }, { text: ': ' }, { text: '"Luis Palacio"', cls: 'str' }, { text: ',' }],
  [{ text: '  ' }, { text: 'role', cls: 'prop' }, { text: ': ' }, { text: '"Full Stack Developer"', cls: 'str' }, { text: ',' }],
  [{ text: '  ' }, { text: 'stack', cls: 'prop' }, { text: ': [' }],
  [{ text: '    ' }, { text: '"React + Next.js"', cls: 'str' }, { text: ',' }],
  [{ text: '    ' }, { text: '"React Native + Expo"', cls: 'str' }, { text: ',' }],
  [{ text: '    ' }, { text: '"TypeScript"', cls: 'str' }, { text: ',' }],
  [{ text: '    ' }, { text: '"Python"', cls: 'str' }, { text: ',' }],
  [{ text: '    ' }, { text: '"Java + Spring Boot"', cls: 'str' }, { text: ',' }],
  [{ text: '    ' }, { text: '"Supabase / PostgreSQL"', cls: 'str' }, { text: ',' }],
  [{ text: '  ],' }],
  [{ text: '  ' }, { text: 'ai', cls: 'prop' }, { text: ': ' }, { text: '"agentes com validação"', cls: 'str' }, { text: ',' }],
  [{ text: '  ' }, { text: 'building', cls: 'prop' }, { text: ': ' }, { text: '"FinFlow 🚀"', cls: 'str' }, { text: ',' }],
  [{ text: '  ' }, { text: 'status', cls: 'prop' }, { text: ': ' }, { text: '"open to work ✅"', cls: 'str' }, { text: ',' }],
  [{ text: '}' }],
];

const PROMPT = 'luis@portfolio:~$';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

interface Entry {
  id: number;
  /** `null` para saídas sem comando digitado (ex.: opções do Tab). */
  command: string | null;
  output: ReactNode;
}

interface TerminalProps {
  onProjectFilter: (filter: CategoryId) => void;
  onToggleTheme: () => void;
}

export default function Terminal({ onProjectFilter, onToggleTheme }: TerminalProps) {
  const [visibleLines, setVisibleLines] = useState(() =>
    prefersReducedMotion() ? CODE_LINES.length : 0,
  );
  const [codeCleared, setCodeCleared] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [input, setInput] = useState('');
  const [past, setPast] = useState<string[]>([]);
  const [pastIndex, setPastIndex] = useState<number | null>(null);

  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(0);

  const ready = visibleLines >= CODE_LINES.length;

  // Digitação inicial do objeto `developer`, linha a linha.
  useEffect(() => {
    if (prefersReducedMotion()) return;

    let line = 0;
    let timer: ReturnType<typeof setTimeout>;
    const reveal = () => {
      line += 1;
      setVisibleLines(line);
      if (line < CODE_LINES.length) timer = setTimeout(reveal, 140);
    };
    timer = setTimeout(reveal, 1400);
    return () => clearTimeout(timer);
  }, []);

  // Mantém a última saída visível (rola só o terminal, nunca a página).
  useEffect(() => {
    const body = bodyRef.current;
    if (body) body.scrollTop = body.scrollHeight;
  }, [entries, codeCleared]);

  const actions: TerminalActions = {
    setProjectFilter: onProjectFilter,
    toggleTheme: onToggleTheme,
    scrollTo: (id) => document.getElementById(id)?.scrollIntoView({ block: 'start' }),
    openUrl: (url) => window.open(url, '_blank', 'noopener,noreferrer'),
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const command = input.trim();
    setInput('');
    setPastIndex(null);
    if (!command) return;

    setPast((list) => [...list, command]);
    const output = runCommand(command, actions);

    if (output === CLEAR) {
      setEntries([]);
      setCodeCleared(true);
      return;
    }
    setEntries((list) => [...list, { id: nextId.current++, command, output }]);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    // Com texto no prompt, Tab completa e nunca tira o foco do terminal. Com o
    // prompt vazio (ou Shift+Tab), segue a navegação normal: sem armadilha de teclado.
    if (event.key === 'Tab' && !event.shiftKey && input.trim() !== '') {
      event.preventDefault();
      const { line, candidates } = completeCommand(input);
      if (line) {
        setInput(line);
      } else if (candidates.length > 1) {
        setEntries((list) => [
          ...list,
          { id: nextId.current++, command: null, output: candidates.join('  ') },
        ]);
      }
      return;
    }

    if (event.key === 'Escape') {
      setInput('');
      setPastIndex(null);
      return;
    }

    if (event.key === 'ArrowUp' && past.length > 0) {
      event.preventDefault();
      const index = pastIndex === null ? past.length - 1 : Math.max(0, pastIndex - 1);
      setPastIndex(index);
      setInput(past[index]);
      return;
    }

    if (event.key === 'ArrowDown' && pastIndex !== null) {
      event.preventDefault();
      const index = pastIndex + 1;
      if (index >= past.length) {
        setPastIndex(null);
        setInput('');
      } else {
        setPastIndex(index);
        setInput(past[index]);
      }
    }
  };

  // Clicar em qualquer ponto do terminal foca o prompt, sem atrapalhar seleção de texto.
  const focusPrompt = () => {
    if (window.getSelection()?.toString()) return;
    inputRef.current?.focus({ preventScroll: true });
  };

  return (
    <div className="code-terminal" onClick={focusPrompt}>
      <div className="terminal-header">
        <span className="dot red" />
        <span className="dot yellow" />
        <span className="dot green" />
        <span className="terminal-title">developer.ts</span>
      </div>
      <div className="terminal-body" ref={bodyRef}>
        {!codeCleared && (
          <pre className="code-block">
            {CODE_LINES.slice(0, visibleLines).map((tokens, i) => (
              <span key={i}>
                {i > 0 ? '\n' : ''}
                {tokens.map((token, j) =>
                  token.cls ? (
                    <span key={j} className={token.cls}>
                      {token.text}
                    </span>
                  ) : (
                    token.text
                  ),
                )}
              </span>
            ))}
            {!ready && (
              <>
                {'\n'}
                <span className="cursor" />
              </>
            )}
          </pre>
        )}

        {ready && (
          <div className="term-session">
            {past.length === 0 && (
              <p className="term-hint">
                {'// digite '}
                <kbd>help</kbd>
                {' e pressione Enter'}
              </p>
            )}

            <div aria-live="polite">
              {entries.map((entry) => (
                <div key={entry.id} className="term-entry">
                  {entry.command !== null && (
                    <div>
                      <span className="term-prompt" aria-hidden="true">
                        {PROMPT}
                      </span>{' '}
                      {entry.command}
                    </div>
                  )}
                  {entry.output !== null && entry.output !== '' && (
                    <div className="term-output">{entry.output}</div>
                  )}
                </div>
              ))}
            </div>

            <form className="term-input-line" onSubmit={submit}>
              <span className="term-prompt" aria-hidden="true">
                {PROMPT}
              </span>
              <input
                ref={inputRef}
                className="term-input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={onKeyDown}
                aria-label="Comando do terminal. Digite help para ver os comandos."
                autoComplete="off"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                enterKeyHint="send"
              />
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
