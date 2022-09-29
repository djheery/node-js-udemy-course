# Streams and Buffers

A stream is an ongoing process such as a request. 
The request is read in chunks until it's done: 

Stream ==> Request Body P1 ===> Request Body P2 ===> Request Body P3 ===> Fully Parsed

This is done so that we theoretically can start working on individual chunks before the request is fully parsed.
This is useful in scenarios where the request may take longer such as a file upload.

Streaming the data allows us to start writing to a disk before the entire request has come in. 

Buffers are used to organize specific chunks, it alows you to hold multiple chunks and release when you are done. 

