<template>
  <div id="app">
    <h1>Please fill in what you have eaten</h1>
    <p>So we can help you with your progress!</p>
    <input type="text" v-model="searchString" placeholder="Search for food" @keyup="checkData">


    
    <ul>
      <li v-for="product in filteredProducts" v-show="active">
        <p>{{product.name}}</p>
        <button @click="addAllFood(product.name)" class="add-button">Add</button>
      </li>
    </ul>
    <button class="end-button" @click="addToDB">Add Food</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      active: false,
      searchString: "",
      eatingTime: 'breakfest',
      products: [],
      addedProducts: []
    }
  },
  methods: {
    addInput () {
      if(this.searchString !== '') {
        this.active = true
      } else {
        this.active = false
      }
    },
    checkData (data,name) {
      this.addInput();
      
      this.$http.get(`https://api.nal.usda.gov/ndb/search/?format=json&q=${this.searchString}&sort=n&max=3&offset=0&api_key=Hlb0DX1W4W0Rs0oXV3nxGhGpzhgwZ5nJyTXYeodC`)
        .then(response => {
          this.products = response.body.list.item
        }, error => {
          console.log(error);
        });
    },
    addAllFood (name) {
      var oldItems = JSON.parse(localStorage.getItem('itemsArray')) || [];

      var newItem = {
        [this.eatingTime] : {
          'id': 123123,
          'product-name': name
        }
      };

      oldItems.push(newItem);
      localStorage.setItem('itemsArray', JSON.stringify(oldItems));

    },
    addToDB () {
        this.$http.post('https://veggieapp-eccde.firebaseio.com/data.json', JSON.parse(localStorage.getItem('itemsArray')))
        .then(response => {
          console.log(response)
        }, error => {
          console.log(error);
        });
    }
  },
  mounted () {
    localStorage.clear();
          console.log(JSON.parse(localStorage.getItem('itemsArray')));
  },
  computed: {
    filteredProducts () {
      let products_array = this.products,
          searchString = this.searchString;

      if(!searchString){
        return products_array;
      }

      searchString = searchString.trim().toLowerCase();

      products_array = products_array.filter((item) => {
        if(item.name.toLowerCase().indexOf(searchString) !== -1){
          return item;
        }
      })
      return products_array;
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #5B5B5D;
  margin-top: 60px;
  padding: 0 15px 0 15px;
}

h1 {
  font-weight: bold;
  font-size: 25px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
      width: 100%;
    text-align: left;
    font-size: 14px;
    border-bottom: 1px solid #E2E2E2;
    padding-bottom: 16px;
    font-weight: bold;
}

a {
  color: #42b983;
}

.add-button {
  padding: 5px 30px 5px 30px;
    border: none;
    color: #FFF;
    background-color: #e2e2e2;
}

.end-button {
  position : absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  border: none;
  background-color: #00b52a;
  color: #FFF;
}

input {
  margin-top: 20px;
  margin-bottom: 20px;
  border: none;
  border-bottom: 1px solid #e2e2e2;
  padding-bottom: 8px;
  font-weight: bold;
  font-size: 20px;
  color: #e2e2e2;
  
}

::-webkit-input-placeholder {
    color:    #e2e2e2;
}

input:focus{
  outline: none;
}
</style>
