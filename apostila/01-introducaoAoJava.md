---
label: Nav Label
id: 01-introducaoAoJava
categorySlug:
categoryLabel: 
categoryRank: 
documentRank: 
...

# Loops

There are two kind of loops in Java, `for` and `while`.

## For
The for loop has three sections:

```java
    for (int i = 0; i < 3; i++) {}
```
```exec__java
    public class Main {
        public static void main(String[] args) {
            for (int i = 0; i < 3; i++) {}

            }
    }
```

First section runs once when we enter the loop.

Second section is the gate keeper, if it returns `true`, we run the statements in the loop, if it returns `false`, we exit the loop. It runs right after the first section for the first time, then every time the loop is finished and the third section is run.

The third section is the final statement that will run every time the loop runs.

So in the case we have just seen, the loop will run 3 times. Here is the order of the commands:

```java
int i = 0;
i < 3 // 0 < 3 = true
      // Inside of loop
i++ // i is now 1
i < 3 // 1 < 3 = true
      // Inside of loop
i++ // i is now 2
i < 3 // 2 < 3 = true
      // Inside of loop
i++ // i is now 3
i < 3 // 3 < 3 = false
      // Loop is done...
```
```exec__java
public class Main {
    public static void main(String[] args) {
        int i = 0;
        i < 3 // 0 < 3 = true
              // Inside of loop
        i++ // i is now 1
        i < 3 // 1 < 3 = true
              // Inside of loop
        i++ // i is now 2
        i < 3 // 2 < 3 = true
              // Inside of loop
        i++ // i is now 3
        i < 3 // 3 < 3 = false
              // Loop is done...
        

    }
}
```