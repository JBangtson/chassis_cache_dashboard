```mermaid
graph TD;
    A[NodeJS carbitrage_dashboard] --> B[server.js]
    A --> C[package.json]
    A --> D[public/]
    D --> E[index.html]
    D --> F[css/]
    F --> G[styles.css]
    D --> H[js/]
    H --> I[script.js]
    A --> J[carbitrage_dashboard/]
    J --> K[carbitrage_api_processing.py]
    A --> L[db/]
    L --> M[carbitrage.db]
```


__Run npm start in bash__ Visit [page here](http://localhost:3000) and [API here](http://localhost:5000/api/unique_car_makes)


_Keeping just in case, but its probably not that useful anymore 🤷‍♂️_:

* Old:
Run node server.js in bash. 
For carbitrage run 'cabbitrage_api_processing.py' in powershell.




