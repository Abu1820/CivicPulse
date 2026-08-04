# TODO — Fix 401 Unauthorized on POST /api/issues

## Root Cause
`JwtAuthenticationFilter` is annotated `@Component`, so Spring Boot auto-registers it as a standalone servlet filter. It runs once before the security chain, sets authentication, then the `SecurityContextHolderFilter` clears it. When the filter is reached again inside the chain (via `addFilterBefore`), the `OncePerRequestFilter` `alreadyFiltered` flag causes it to skip, so no authentication is set → 401.

## Steps
- [x] 1. Remove `@Component` from `JwtAuthenticationFilter`
- [x] 2. Declare `JwtAuthenticationFilter` as a `@Bean` in `SecurityConfig`
- [x] 3. Rebuild & restart Spring Boot (compile BUILD SUCCESS)
- [ ] 4. Test: login → create issue
