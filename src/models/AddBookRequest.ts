class AddBookRequest {
  title: string;
  author: string;
  description: string;
  copies: number;

  img?: string;

  constructor(
    title: string,
    author: string,
    description: string,
    copies: number,
   
  ) {
    this.title = title;
    this.author = author;
    this.description = description;
    this.copies = copies;
   
  }
}

export default AddBookRequest;
