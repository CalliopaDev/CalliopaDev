---
sidebar_position: 1
---

# Development Workflow

- CalliopaDev uses [Turbo](https://turbo.build/) as monorepo tool
- use `pnpm` as package manager


## Commits

- adhere to conventional commit messages: `<type>[optional scope]: <description>`
- For configuration, setup, devops commits, use type: `config`

```
feat: add hat wobble
^--^  ^------------^
|     |
|     +-> Summary in present tense.
|
+-------> Type: chore, docs, feat, fix, refactor, style, or test.
```


## Domains

- point dev domain to Gh pages:
  - https://dev.to/sidmohanty11/how-to-add-a-custom-domain-to-github-pages-hostinger-edition-p4p
  - https://medium.com/@jaredpotter1/connecting-a-dev-domain-to-github-pages-with-https-f0c59fb62579
  - https://stackoverflow.com/questions/54059217/how-to-fix-domain-does-not-resolve-to-the-github-pages-server-error-in-github