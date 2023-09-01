export interface Executable {
  execute(args: string[]): Promise<void>;
}
