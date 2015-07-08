# jqTree AngularJS FireBase Example


## Build & development

- sudo npm install
- bower install
- Run `grunt serve` for preview.

## Screenshot 

![1](app/images/demo.png "01")

## Example data in firebase 
```json
[
  {
    "left": 1,
    "name": "laptops",
    "parentId": "",
    "right": 2,
    "$id": "-Jtd1j5AYvtWd_ZwsdbQ",
    "$priority": null
  },
  {
    "left": 3,
    "name": "pc",
    "parentId": "",
    "right": 8,
    "$id": "-Jtd1lPY9QJO8YilovKm",
    "$priority": null
  },
  {
    "left": 4,
    "name": "memory",
    "parentId": "-Jtd1lPY9QJO8YilovKm",
    "right": 5,
    "$id": "-Jtd216PquxxLt8FEZii",
    "$priority": null
  },
  {
    "left": 6,
    "name": "processor",
    "parentId": "-Jtd1lPY9QJO8YilovKm",
    "right": 7,
    "$id": "-Jtd24AfoRp9OGy2opj4",
    "$priority": null
  },
  {
    "left": 9,
    "name": "led",
    "parentId": "",
    "right": 10,
    "$id": "-Jtd1nUfikKMy4sDRaRf",
    "$priority": null
  },
  {
    "left": 11,
    "name": "mouse",
    "parentId": "",
    "right": 18,
    "$id": "-Jtd1payQjbEgHT5HcA-",
    "$priority": null
  },
  {
    "left": 12,
    "name": "fans coolers",
    "parentId": "-Jtd1payQjbEgHT5HcA-",
    "right": 15,
    "$id": "-Jtd2cn3xI5u6odo4qdf",
    "$priority": null
  },
  {
    "left": 13,
    "name": "CPU coolers",
    "parentId": "-Jtd2cn3xI5u6odo4qdf",
    "right": 14,
    "$id": "-Jtd2fFuFysgdzLkMjTL",
    "$priority": null
  },
  {
    "left": 16,
    "name": "usb",
    "parentId": "-Jtd1payQjbEgHT5HcA-",
    "right": 17,
    "$id": "-Jtd1xUoJKgxiJSY-Sh5",
    "$priority": null
  }
]
```

## Example data in view, in jqTree format 

```json
[
  {
    "id": "-Jtd1j5AYvtWd_ZwsdbQ",
    "label": "laptops",
    "parentId": "",
    "left": 1,
    "right": 2,
    "children": []
  },
  {
    "id": "-Jtd1lPY9QJO8YilovKm",
    "label": "pc",
    "parentId": "",
    "left": 3,
    "right": 8,
    "children": [
      {
        "id": "-Jtd216PquxxLt8FEZii",
        "label": "memory",
        "parentId": "-Jtd1lPY9QJO8YilovKm",
        "left": 4,
        "right": 5,
        "children": []
      },
      {
        "id": "-Jtd24AfoRp9OGy2opj4",
        "label": "processor",
        "parentId": "-Jtd1lPY9QJO8YilovKm",
        "left": 6,
        "right": 7,
        "children": []
      }
    ]
  },
  {
    "id": "-Jtd1nUfikKMy4sDRaRf",
    "label": "led",
    "parentId": "",
    "left": 9,
    "right": 10,
    "children": []
  },
  {
    "id": "-Jtd1payQjbEgHT5HcA-",
    "label": "mouse",
    "parentId": "",
    "left": 11,
    "right": 18,
    "children": [
      {
        "id": "-Jtd2cn3xI5u6odo4qdf",
        "label": "fans coolers",
        "parentId": "-Jtd1payQjbEgHT5HcA-",
        "left": 12,
        "right": 15,
        "children": [
          {
            "id": "-Jtd2fFuFysgdzLkMjTL",
            "label": "CPU coolers",
            "parentId": "-Jtd2cn3xI5u6odo4qdf",
            "left": 13,
            "right": 14,
            "children": []
          }
        ]
      },
      {
        "id": "-Jtd1xUoJKgxiJSY-Sh5",
        "label": "usb",
        "parentId": "-Jtd1payQjbEgHT5HcA-",
        "left": 16,
        "right": 17,
        "children": []
      }
    ]
  }
] 
```

---

This project is generated with [AngularFire generator](https://github.com/firebase/generator-angularfire)

