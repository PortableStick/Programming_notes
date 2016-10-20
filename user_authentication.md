Password Hashing
====

Passwords cannot be stored in plain text.  Instead, they should be stored in a hash.  Hashing is accomplished by passing the password to a function that calculates a hash based on the input and always produce the same output given that input.  The hash is always the same size, and cannot practically be reversed.  When the user enters their password, it gets sent through the same hashing algorithm for comparison against the stored hash.

Salts
===

Since the output of a hash will always be the same for each input, an attacker could feasibly compare all hashes to find where users have the same passwords.  This can be prevented by adding a random string Salts should be long and random.  They can be stored with the user data and do not need to be kept secret.

Key stretching
===
A processor intensive algorithm that hashes a string.