# Contributing to Solana Full-Stack dApp

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Process](#development-process)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Requirements](#testing-requirements)
- [Documentation](#documentation)

## Code of Conduct

### Our Standards

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on constructive feedback
- Accept responsibility for mistakes
- Prioritize what's best for the community

### Unacceptable Behavior

- Harassment or discriminatory language
- Personal attacks or trolling
- Publishing others' private information
- Other conduct inappropriate in a professional setting

## Getting Started

### Prerequisites

Before contributing, ensure you have:

1. All required tools installed (see main README.md)
2. A GitHub account
3. Git configured locally
4. Familiarity with the project structure

### Setting Up Development Environment

```bash
# Fork the repository on GitHub

# Clone your fork
git clone https://github.com/YOUR_USERNAME/project-name.git
cd project-name

# Add upstream remote
git remote add upstream https://github.com/ORIGINAL_OWNER/project-name.git

# Run setup
make setup

# Create a new branch
git checkout -b feature/your-feature-name
```

## How to Contribute

### Reporting Bugs

Before creating a bug report:

1. **Check existing issues** to avoid duplicates
2. **Verify the bug** on the latest version
3. **Gather information**: version, OS, error messages, logs

Create a bug report with:

- Clear, descriptive title
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Environment details

**Template**:
```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment**
- OS: [e.g., macOS 12.0]
- Node version: [e.g., 18.0.0]
- Solana CLI version: [e.g., 1.17.0]
```

### Suggesting Features

Feature requests should include:

- **Use case**: Why is this feature needed?
- **Proposed solution**: How should it work?
- **Alternatives**: What other solutions did you consider?
- **Impact**: Who benefits from this feature?

### Contributing Code

Areas where contributions are welcome:

- Bug fixes
- Feature implementations
- Performance improvements
- Documentation improvements
- Test coverage expansion
- UI/UX enhancements

## Development Process

### 1. Choose an Issue

- Check the issue tracker for open issues
- Look for issues labeled `good first issue` if you're new
- Comment on the issue to express interest
- Wait for maintainer approval before starting work

### 2. Create a Branch

Use descriptive branch names:

```bash
# Feature branches
git checkout -b feature/add-user-profile

# Bug fix branches
git checkout -b fix/resolve-connection-issue

# Documentation branches
git checkout -b docs/update-setup-guide
```

### 3. Make Changes

- Write clean, readable code
- Follow existing code style
- Add comments for complex logic
- Keep commits focused and atomic
- Write meaningful commit messages

### 4. Test Your Changes

```bash
# Run all tests
make test

# Run linters
make lint

# Test specific components
make test-program
make test-backend
make test-frontend
```

### 5. Update Documentation

- Update README.md if needed
- Add inline code comments
- Update API documentation
- Add examples for new features

## Pull Request Process

### Before Submitting

- [ ] Code follows project style guidelines
- [ ] All tests pass
- [ ] New tests added for new features
- [ ] Documentation updated
- [ ] Commit messages follow convention
- [ ] Branch is up to date with main

### Submitting a Pull Request

1. **Push your branch**:
```bash
git push origin feature/your-feature-name
```

2. **Create PR on GitHub**
   - Use a clear, descriptive title
   - Fill out the PR template completely
   - Link related issues
   - Add screenshots for UI changes

3. **PR Template**:
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How has this been tested?

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed my code
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] Added tests
- [ ] All tests pass
```

### Review Process

1. **Automated Checks**: CI/CD runs tests and linters
2. **Code Review**: Maintainer reviews your code
3. **Feedback**: Address any requested changes
4. **Approval**: Maintainer approves the PR
5. **Merge**: PR is merged to main branch

### Addressing Feedback

```bash
# Make requested changes
# Commit changes
git add .
git commit -m "fix: address review feedback"

# Push updates
git push origin feature/your-feature-name
```

## Coding Standards

### General Principles

- **DRY**: Don't Repeat Yourself
- **KISS**: Keep It Simple, Stupid
- **YAGNI**: You Aren't Gonna Need It
- **Write self-documenting code**
- **Optimize for readability**

### Rust (Program)

```rust
// Good
/// Initializes a new user account
pub fn initialize_user(ctx: Context<InitUser>, name: String) -> Result<()> {
    require!(name.len() <= 32, ErrorCode::NameTooLong);
    
    let user = &mut ctx.accounts.user;
    user.name = name;
    user.created_at = Clock::get()?.unix_timestamp;
    
    Ok(())
}

// Bad
pub fn init(ctx:Context<InitUser>,n:String)->Result<()>{
    ctx.accounts.user.name=n;Ok(())
}
```

### JavaScript/TypeScript

```javascript
// Good
async function fetchUserData(userId) {
  if (!userId) {
    throw new Error('User ID is required');
  }
  
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    logger.error('Failed to fetch user data:', error);
    throw error;
  }
}

// Bad
async function get(id){
  return await api.get('/users/'+id);
}
```

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples**:
```
feat(backend): add user authentication endpoint

Implement JWT-based authentication with refresh tokens.
Includes rate limiting and security headers.

Closes #123
```

```
fix(frontend): resolve wallet connection issue

Fix race condition when connecting wallet on slow networks.
Add retry logic with exponential backoff.

Fixes #456
```

## Testing Requirements

### Test Coverage

- Aim for >80% code coverage
- All new features must include tests
- Bug fixes should include regression tests

### Test Types

**Unit Tests**:
```javascript
describe('UserService', () => {
  it('should create a new user', async () => {
    const user = await userService.create({ name: 'Test' });
    expect(user.name).toBe('Test');
  });
});
```

**Integration Tests**:
```javascript
describe('API Integration', () => {
  it('should fetch user from database', async () => {
    const response = await request(app).get('/api/users/1');
    expect(response.status).toBe(200);
  });
});
```

**Program Tests**:
```rust
#[tokio::test]
async fn test_initialize() {
    let program = setup_program().await;
    let result = program.initialize(InitializeParams { ... }).await;
    assert!(result.is_ok());
}
```

## Documentation

### Code Documentation

**Rust**:
```rust
/// Transfers tokens from one account to another
///
/// # Arguments
/// * `amount` - The amount of tokens to transfer
/// * `from` - The source account
/// * `to` - The destination account
///
/// # Errors
/// Returns error if insufficient balance
pub fn transfer(amount: u64, from: &Account, to: &Account) -> Result<()> {
    // Implementation
}
```

**JavaScript**:
```javascript
/**
 * Fetches user profile from the API
 * 
 * @param {string} userId - The user ID to fetch
 * @returns {Promise<User>} The user profile data
 * @throws {Error} If user not found or network error
 */
async function fetchUserProfile(userId) {
  // Implementation
}
```

### README Updates

Update README.md when you:

- Add new features
- Change setup process
- Add new dependencies
- Modify environment variables

## Questions?

- Check [DEVELOPMENT.md](DEVELOPMENT.md) for technical details
- Search existing issues and discussions
- Ask in project Discord/Slack (if available)
- Open a discussion on GitHub

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing! 🎉
