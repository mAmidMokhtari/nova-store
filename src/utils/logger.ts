export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LEVEL_ORDER: Record<LogLevel, number> = { debug: 10, info: 20, warn: 30, error: 40 };

type LogFields = Record<string, unknown>;

const minLevel: LogLevel = process.env.NODE_ENV === 'production' ? 'info' : 'debug';

function emit(level: LogLevel, scope: string, message: string, fields?: LogFields): void {
  if (LEVEL_ORDER[level] < LEVEL_ORDER[minLevel]) return;

  const sink = level === 'error' ? console.error : level === 'warn' ? console.warn : console.log;

  if (typeof window === 'undefined') {
    sink(JSON.stringify({ level, scope, message, time: new Date().toISOString(), ...fields }));
  } else {
    sink(`[${scope}] ${message}`, fields ?? '');
  }
}

export type Logger = {
  debug: (message: string, fields?: LogFields) => void;
  info: (message: string, fields?: LogFields) => void;
  warn: (message: string, fields?: LogFields) => void;
  error: (message: string, fields?: LogFields) => void;
};

/**
 * Structured logger: JSON lines on the server (parsable by any log aggregator),
 * readable prefixes in the browser. Create one per module. This is the only
 * place `console` is used.
 */
export function createLogger(scope: string): Logger {
  return {
    debug: (message, fields) => emit('debug', scope, message, fields),
    info: (message, fields) => emit('info', scope, message, fields),
    warn: (message, fields) => emit('warn', scope, message, fields),
    error: (message, fields) => emit('error', scope, message, fields),
  };
}
