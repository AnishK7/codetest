# Contributing to Solana Counter Program

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/PROJECT_NAME.git
   cd PROJECT_NAME
   ```
3. Add upstream remote:
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/PROJECT_NAME.git
   ```
4. Install dependencies:
   ```bash
   make install
   ```

## Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

Use descriptive branch names:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `test/` - Test additions or modifications
- `refactor/` - Code refactoring

### 2. Make Your Changes

- Write clean, readable code
- Follow the existing code style
- Add comments for complex logic
- Update documentation as needed

### 3. Test Your Changes

```bash
# Build the program
make build

# Run tests
make test

# Format code
make format

# Lint code
make lint
```

Ensure all tests pass before submitting your PR.

### 4. Commit Your Changes

Write clear, concise commit messages:

```bash
git add .
git commit -m "feat: add decrement instruction to counter program"
```

**Commit Message Format:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `test:` - Test changes
- `refactor:` - Code refactoring
- `chore:` - Maintenance tasks

### 5. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub with:
- Clear title describing the change
- Detailed description of what and why
- Reference any related issues
- Screenshots (if applicable)

## Code Style Guidelines

### Rust (Anchor Program)

- Use 4 spaces for indentation
- Follow Rust naming conventions
- Add doc comments for public functions
- Use descriptive variable names
- Handle errors appropriately

Example:
```rust
/// Increments the counter value by 1
pub fn increment(ctx: Context<Increment>) -> Result<()> {
    let counter = &mut ctx.accounts.counter;
    counter.count = counter.count.checked_add(1)
        .ok_or(ErrorCode::Overflow)?;
    Ok(())
}
```

### TypeScript (Tests & Frontend)

- Use 2 spaces for indentation
- Use camelCase for variables and functions
- Use PascalCase for types and interfaces
- Add type annotations
- Use async/await over promises

Example:
```typescript
async function initializeCounter(
  program: Program<CounterProgram>,
  counterKeypair: Keypair
): Promise<string> {
  const tx = await program.methods
    .initialize()
    .accounts({
      counter: counterKeypair.publicKey,
    })
    .signers([counterKeypair])
    .rpc();
  return tx;
}
```

## Testing Guidelines

### Writing Tests

- Write descriptive test names
- Test both success and failure cases
- Use appropriate assertions
- Clean up test data
- Mock external dependencies when needed

Example:
```typescript
it("fails to increment with wrong authority", async () => {
  const wrongAuthority = Keypair.generate();
  
  try {
    await program.methods
      .increment()
      .accounts({
        counter: counterKeypair.publicKey,
        authority: wrongAuthority.publicKey,
      })
      .signers([wrongAuthority])
      .rpc();
    
    assert.fail("Expected error");
  } catch (error) {
    assert.include(error.toString(), "Unauthorized");
  }
});
```

### Test Coverage

Aim for comprehensive test coverage:
- All instruction handlers
- Edge cases and boundary conditions
- Error conditions
- Account validation
- Authority checks

## Documentation

### Code Documentation

- Add doc comments to public functions
- Explain complex algorithms
- Document account structures
- Include usage examples

### README Updates

Update README.md when adding:
- New features
- Changed APIs
- New configuration options
- New dependencies

## Pull Request Checklist

Before submitting a PR, ensure:

- [ ] Code builds without errors
- [ ] All tests pass
- [ ] New tests added for new features
- [ ] Code is formatted (`make format`)
- [ ] Code is linted (`make lint`)
- [ ] Documentation is updated
- [ ] Commit messages are clear
- [ ] Branch is up to date with main

## Reporting Issues

### Bug Reports

Include:
- Clear description of the bug
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment details (OS, Rust version, etc.)
- Error messages or logs

### Feature Requests

Include:
- Clear description of the feature
- Use case and motivation
- Proposed implementation (optional)
- Alternatives considered

## Code Review Process

1. Maintainers will review your PR
2. Address any feedback or requested changes
3. Once approved, your PR will be merged
4. Your contribution will be credited

## Questions?

Feel free to:
- Open an issue for questions
- Join our community discussions
- Reach out to maintainers

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Assume good intentions

Thank you for contributing! 🙏
