# Conference-API
Towards assignment submission - KonfHub Technologies by Harsh Joshi

# API Documentation
| Status        | Data                                           Path        | EndPoint						  |
| ------------- | -------------------------------------  | ----------------- |----------------------------------------------------|
| :green_heart: | Human Readable Format : (GET)          | /search           |
| :green_heart: | Find Duplicates: (GET)                 | /duplicate        |
| :green_heart: | Semantic Duplicates: (GET)             | /nearduplicate    |

# Implementation: 

## Packages Used
* express
* node-fetch
* string-similarity

## Displaying Data in Human Readable Format:
#### Concepts Used:
* Fetch
* Promises
* JSON Traversal and Object attribute Comparisons

## Find Duplicates:
#### Concepts Used:
* Fetch
* Promises
* Filter and Maps


## Semantic Duplicates
#### Concepts Used:
* Fetch
* Promises
* npm package - string-similarity

#### Steps
* Install string-similarity
* Iterate for every possible combination inside paid and free conferences (json["paid" and json["free"])
* Use string similarity to calculate similarity score after converting objects to string 
* If the similarity is >0.7 but is not 1 (Total Duplicate) add to the output array.


