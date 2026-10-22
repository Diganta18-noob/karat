# Context routing

Source: React JS!F16, code block 2.


### Question

We are working on a back-office application that displays products available for purchase on our company's website. Currently, the code fails when attempting to fetch the data. Please identify why and fix it.

Additionally, modify the given React application so that the ViewProduct component displays the following:

* The following information once the data is loaded:
    * Title, in bold
    * Category
    * Price retrieved from the API formatted as dollars and cents with the dollar symbol, e.g. $450.00
    * Discount Percentage
    * Description
    * The thumbnail image

Treat this like a production application, using appropriate best practices.

The API data returned has the following shape:

{
  ""id"": 1,
  ""title"": ""iPhone 9"",
  ""description"": ""An apple mobile which is nothing like apple"",
  ""price"": 549.99,
  ""discountPercentage"": 12.96,
  ""rating"": 4.69,
  ""stock"": 94,
  ""brand"": ""Apple"",
  ""category"": ""smartphones"",
  ""thumbnail"": ""https://dummyjson.com/image/i/products/1/thumbnail.jpg"",
  ""images"": [
    ""https://dummyjson.com/image/i/products/1/1.jpg"", ...
  ]
  .
  .
  .
}

### Original code block 1



## Practice

Edit App.jsx. The supplied bugs and incomplete behavior are kept for you to repair. ORIGINAL.txt preserves the exact extracted code. Solution.jsx is separate.

Only CDN imports, old ReactDOM mounting, Excel doubled quotes and invisible paste characters were adapted for Vite. These setup edits are not interview fixes. Live API examples need internet.

Some original snippets already work: explain their logic rather than inventing bugs. Context may fail to compile until you fix createContex; use the Vite error message.

Run from the project root:

```powershell
npm.cmd run practice:excel -- 03-context
```

Open /?solution=1 only when you want to check the answer.
