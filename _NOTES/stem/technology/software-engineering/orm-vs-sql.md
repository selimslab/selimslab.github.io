---
title: What ORMs have taught me, just learn SQL
tags: pro
---

<https://web.archive.org/web/20190920210113/https://wozniak.ca/blog/2014/08/03/What-ORMs-have-taught-me-just-learn-SQL/>


I’ve come to the conclusion that, for me, ORMs are more detriment than benefit. In short, they can be used to nicely augment working with SQL in a program, but they should not replace it.

Some background: For the past 30 months I’ve been working with code that has to interface with Postgres and to some extent, SQLite. Most of that has been with SQLAlchemy (which I quite like) and Hibernate (which I don’t). I’ve worked with existing code and data models, as well as designing my own. Most of the data is event-based storage (“timelines”) with a heavy emphasis on creating reports.

Much has been written about the Object/Relational Impedance Mismatch. It’s hard to appreciate it until you live it. Neward, in his well known essay, lays out many cogent reasons why ORMs turn into quagmires. In my experience, I’ve had to deal directly with a fair number of them: entity identity issues, dual-schema problem, data retrieval mechanism concern, and the partial-object problem. I want to talk briefly about my experiences with these issues and add one of my own.

## Partial objects, attribute creep, and foreign keys

Perhaps the most subversive issue I’ve had with ORMs is “attribute creep” or “wide tables”, that is, tables that just keep accruing attributes. As much as I’d like to avoid it, sometimes it becomes necessary (although things like Postgres’ hstore can help). For example, a client may be providing you with lots of data that they want attached to reports based on various business logic. Furthermore, you don’t have much insight into this data; you’re just schlepping it around.

This in and of itself isn’t a terrible thing in a database. It becomes a real pain point with an ORM. Specifically, the problem starts to show up in any query that uses the entity directly to create the query. You may have a Hibernate query like so early on in the project.

query(Foo.class).add(Restriction.eq("x", value))
This may be fine when Foo has five attributes, but becomes a data fire hose when it has a hundred. This is the equivalent of using SELECT *, which is usually saying more than what is intended. ORMs, however, encourage this use and often make writing precise projections as tedious as they are in SQL. (I have optimized such queries by adding the appropriate projection and reduced the run time from minutes to seconds; all the time was spent translating the database row into a Java object.)

Which leads to another bad experience: the pernicious use of foreign keys. In the ORMs I’ve used, links between classes are represented in the data model as foreign keys which, if not configured carefully, result in a large number of joins when retrieving the object. (A recent count of one such table in my work resulted in over 600 attributes and 14 joins to access a single object, using the preferred query methodology.)

Attribute creep and excessive use of foreign keys shows me is that in order to use ORMs effectively, you still need to know SQL. My contention with ORMs is that, if you need to know SQL, just use SQL since it prevents the need to know how non-SQL gets translated to SQL.

## Data retrieval

Knowing how to write SQL becomes even more important when you attempt to actually write queries using an ORM. This is especially important when efficiency is a concern.

From what I’ve seen, unless you have a really simple data model (that is, you never do joins), you will be bending over backwards to figure out how to get an ORM to generate SQL that runs efficiently. Most of the time, it’s more obfuscated than actual SQL.

And if you elect to keep the query simple, you end up doing a lot of work in the code that could be done in the database faster. Window functions are relatively advanced SQL that is painful to write with ORMs. Not writing them into the query likely means you will be transferring a lot of extra data from the database to your application.

In these cases, I’ve elected to write queries using a templating system and describe the tables using the ORM. I get the convenience of an application level description of the table with direct use of SQL. It’s a lot less trouble than anything else I’ve used so far.

##  Dual schema dangers

This one seems to be one of those unavoidable redundancies. If you try to get rid of it, you only make more problems or add excessive complexity.

The problem is that you end up having a data definition in two places: the database and your application. If you keep the definition entirely in the application, you end up having to write the SQL Data Definition Language (DDL) with the ORM code, which is the same complication as writing advanced queries in the ORM. If you keep it in the database, you will probably want a representation in the application for convenience and to prevent too much “string typing”.

I much prefer to keep the data definition in the database and read it into the application. It doesn’t solve the problem, but it makes it more manageable. I’ve found that reflection techniques to get the data definition are not worth it and I succumb to managing the redundancy of data definitons in two places.

But the damn migration issue is a real kick in the teeth: changing the model is no big deal in the application, but a real pain in the database. After all, databases are persistent whereas application data is not. ORMs simply get in the way here because they don’t help manage data migration at all. I work on the principle that the database’s data definitions aren’t things you should manipulate in the application. Instead, manipulate the results of queries. That is, the queries are your API to the database. So instead of thinking about objects, I think about functions with return types.

Thus, one is forced to ask, should you use an ORM for anything but convenience in making queries?

## Identities

Dealing with entity identities is one of those things that you have to keep in mind at all times when working with ORMs, forcing you to write for two systems while only have the expressivity of one.

When you have foreign keys, you refer to related identities with an identifier. In your application, “identifier” takes on various meanings, but usually it’s the memory location (a pointer). In the database, it’s the state of the object itself. These two things don’t really get along because you can really only use database identifiers in the database (the ultimate destination of the data you’re working with).

What this results in is having to manipulate the ORM to get a database identifier by manually flushing the cache or doing a partial commit to get the actual database identifier.

I can’t even call this a leaky abstraction because the work “leak” implies small amounts of the contents escaping relative to the source.

## Transactions

Something that Neward alludes to is the need for developers to handle transactions. Transactions are dynamically scoped, which is a powerful but mostly neglected concept in programming languages due to the confusion they cause if overused. This leads to a lot of boilerplate code with exception handlers and a careful consideration of where transaction boundaries should occur. It also makes you pass session objects around to any function/method that might have to communicate with the database.

The concept of a transaction translates poorly to applications due to their reliance on context based on time. As mentioned, dynamic scoping is one way to use this in a program, but it is at odds with lexical scoping, the dominant paradigm. Thus, you must take great care to know about the “when” of a transaction when writing code that works with databases and can make modularity tricky (“Here’s a useful function that will only work in certain contexts”).

Where do I see myself going?

At this point, I’m starting to question the wisdom behind the outright rejection of stored procedures. It sounds heretical, but it may work for my use cases. (And hey, with the advent of “devops”, the divide between the developer and the database administrator is basically non-existent.)

I’ve found myself thinking about the database as just another data type that has an API: the queries. The queries return values of some type, which are represented as some object in the program. By moving away from thinking of the objects in my application as something to be stored in a database (the raison d’être for ORMs) and instead thinking of the database as a (large and complex) data type, I’ve found working with a database from an application to be much simpler. And wondering why I didn’t see it earlier.

(It should be made clear that I am not claiming this is how all applications should deal with a database. All I am saying is that this fits my use case based on the data I am working with.)

Regardless of whether I find that stored procedures aren’t actually that evil or whether I keep using templated SQL, I do know one thing: I won’t fall into the “ORMs make it easy” trap. They are an acceptable way to represent a data definition, but a poor way to write queries and a bad way to store object state. If you’re using an RDBMS, bite the bullet and learn SQL.