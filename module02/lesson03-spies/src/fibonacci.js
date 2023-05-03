class Fibonacci {
  *execute(input, current = 0, next = 1) {
    // Processou todas as sequencias
    if (input === 0) return;

    // Retorna o valor
    yield current;

    // Delega a função mas não retorna o valor
    yield* this.execute(input - 1, next, next + current);
  }
}

module.exports = Fibonacci;
