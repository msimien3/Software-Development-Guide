# Software Development Guide

A standalone, searchable library of practical software development and configuration tutorials. This is separate from the **Training Encyclopedia**.

## Open the guide

Open [index.html](index.html) in a browser to browse and search the tutorials.

## Current tutorials

- [Dapper with SQL Server and Oracle](guides/database/dapper.html) — NuGet setup, connections, async queries, mapping, parameters, and troubleshooting.
- [Entity Framework Core with SQL Server and Oracle](guides/database/entity-framework.html) — providers, models, DbContext, LINQ, raw SQL, and troubleshooting.

## Run the sample code

Configure **MSSQL_CONNECTION_STRING** and **ORACLE_CONNECTION_STRING** as environment variables on your development machine. The tutorial data model and table names are illustrative and must be adapted to your actual schema.

**Security:** Never put credentials or internal infrastructure details in source control. Credentials from the original uploaded HTML were stripped before publication. Rotate any credentials that may have been shared.

## Adding more guides

1. Create a guide under `guides/<topic>/name.html`.
2. Add a card linking to it in `index.html`.
3. Add suitable search keywords to the card's `data-keywords` attribute.
4. Commit and push the change.

Future categories can include ASP.NET Core, Blazor, REST APIs, dependency injection, debugging, deployment, and CI/CD.

## GitHub Pages

GitHub Pages availability varies by account plan and repository visibility. If available, publish from the default branch's root directory in **Settings → Pages**. Otherwise, download the repository and open `index.html` locally.
