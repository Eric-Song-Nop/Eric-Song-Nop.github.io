tags:: #[[Basic Kotlin]]

- Type cast is so common in OO languages but also a common cause of errors. While Kotlin provides you with an automated way of doing safe type checking and casting.
- ## Type Checking and Smart Cast Using `is`
	- ```kotlin
	  fun demo(x: Any) {
	      if (x is String) {
	          print(x.length) // x is automatically cast to String
	      }
	  }
	  ```
	- Same technique is used widely for pattern matching in Kotlin
		- ```kotlin
		  when (x) {
		      is Int -> print(x + 1)
		      is String -> print(x.length + 1)
		      is IntArray -> print(x.sum())
		  }
		  ```
	- ### Smart Cast Works for:
		- `val local variable`: except [local delegated properties](https://kotlinlang.org/docs/delegated-properties.html)
		- `val properties`: `private`, `internal`, or if the check is performed in the same [module](https://kotlinlang.org/docs/visibility-modifiers.html#modules), can't be used on `open` properties or properties that have custom `getters``
		- `var local variable`: If the variable is not modified between the check and its usage
		- `var properties`: Never
- ## Manually Type Cast
	- Unsafe:
		- ```kotlin
		  val x: String? = y as? String
		  ```
	- Safe:
		- ```kot
		  val x: String? = y as? String
		  ```
- ## References
- [Kotlin official document for type checks and casts](https://kotlinlang.org/docs/typecasts.html#is-and-is-operators)
- [Dave Leed's video on smart cast](https://youtu.be/LFmF6kuYItc?si=dAuTTUbApsmlshfy)