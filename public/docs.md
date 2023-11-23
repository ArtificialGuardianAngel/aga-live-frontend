
# API Documenttation for HACKATON


## Authorization

> POST `/auth/connect`

Body:
```ts
{
    metadata: {}
}
``` 
Response:
> 200
```ts
{
    token: "some token"
}
```

> POST `/prompt/generate`

Body:
```ts
{
    prompt: string,
    history: History,
    tags: {
        prompt: string,
        answer: string
    }
    stop: string[]
}
```
learn more about this fields [here](#Generation)

Response:
> 200
```ts title=200
{
    "text": "Blah-blah"
}
```
> 400
```json
{
    "message": "Bad request",
    "error": {}
}
```
> 401
```json
{
    "message": "Unauthorized",
    "error": {}
}
```
> 500
```json
{
    "message": "Internal Server Error",
    "error": {}
}
```

## Streaming prompt response
> POST `/prompt/generate/stream`

Headers:
```http
Content-Type: application/json
```
Body:
```ts
{
    prompt: string,
    history: History,
    tags: {
        prompt: string,
        answer: string
    }
    stop: string[]
}
```
learn more about this fields [here](#generation)

Response:

Headers: 
```http
Content-Type: text/event-stream
```
Read mote about [text/event-stream](#authorization)
> 200
```json
{
    "text": "Blah-blah"
}
```
> 400
```json
{
    "message": "Bad request",
    "error": {}
}
```
> 401
```json
{
    "message": "Unauthorized",
    "error": {}
}
```
> 500
```json
{
    "message": "Internal Server Error",
    "error": {}
}
```

## Generation

> Request body example:
>
```json
{
    "prompt": "Hello",
    "history": [],
    "tags": {
        "prompt": "user",
        "answer": "ai",
    },
    "stop": ["</ai>"]
}
```
### `tags` field


Your history object will be **mapped** according to this **rule**:
```html
<tags.prompt>{historyItem[0]}</tags.prompt>
<tags.answer>{historyItem[1]}</tags.answer>
```
According to example `user` and `ai` will be mapped like that
```html title=example
<user>Hello</user>
<ai>Hello, how are you?</ai>
```

### `stop` field
`stop` is a array of stop generation marks, if you dont provide them, `tags.answer` will be used as stop mark

## Entities

### History
```ts
type History = [string, string][]
```
> *Note: At position `0` is prompt input, at `1` generated answer*