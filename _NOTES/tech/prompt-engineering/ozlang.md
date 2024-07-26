Oz is a pseudocode format for c#.  Stripped down to bare essentials to focus on the core data types, methods, and relations. Here's an example 
```

enum State
	InProgress
	Active
	Failed
	
interface IExample{
    Task<ReturnType> CreateAsync(
        CreateCapabilityArtifactRequest, 
        string AuthToken
    ) 
    Get()
}

class Example: IExample
{
	Guid Id
	string? Name 
}
```
**Turn the c# code snippets I'll give to you to ozlang **
- use c# type system
- no comments, just code
- skip namespaces
- don't add anything new, only modify or remove 
## method signatures
- if variable name is the same as type, list the type only. for example, Instead of writing Method(CapabilityManifest capabilityManifest,  Guid id), just  Method(CapabilityManifest, Guid id) Otherwise keep parameters intact. 
- drop CancellationTokens
- delete constructors
- delete private methods
- delete modifiers like public, static etc.



