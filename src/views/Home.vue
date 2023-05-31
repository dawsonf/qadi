<script setup>
import { FormKitIcon } from '@formkit/vue'
</script>

<template>


  <main>
    
    

    
      <div class="steps-container">

        <div class="start-container">

          <div class="box">
            <FormKit
              type="date"
              name="date"
              label="Date"
              validation="required|after"
              validation-visibility="live"
              v-model="qadi.date"
              prefix-icon="month"
            />
          </div>
          <div class="box">
            <FormKit 
              type="text"
              v-model="qadi.ref"
              label="Reference"
            />
          </div>
          <div class="box">
            <FormKit 
              type="text"
              v-model="qadi.title"
              label="Project"
            />
          </div>
          <div class="box">
            <FormKit 
              type="text"
              v-model="qadi.name"
              label="Your Name"
            />
          </div>
        </div>

        <div class="step-container" v-bind:key="item.id"  v-for="(item, index) in qadi.steps">
          <div class="box" style="min-width: 50%;">
            <!-- <input v-model="item.name"> -->
            <FormKit 
              type="text"
              v-model="item.name"
            />
            <div class="qadi-container">
              
              <div class="qadi"><FormKit 
                type="number"
                help="Quality (Max 40%)"
                step="1"
                v-model="item.quality"
                max="40"
                min="0"
                prefix-icon="check"
              /></div>
              <div class="qadi"><FormKit 
                type="number"
                help="Attitude (Max 10%)"
                step="1"
                v-model="item.attitude"
                max="10"
                min="0"
                prefix-icon="happy"
              /></div>
              <div class="qadi"><FormKit 
                type="number"
                help="Deadline (Max 40%)"
                step="1"
                v-model="item.deadline"
                max="40"
                min="0"
                prefix-icon="month"
              /></div>
              <div class="qadi"><FormKit 
                type="number"
                help="Innovation (Max 10%)"
                step="1"
                v-model="item.innovation"
                max="10"
                min="0"
                prefix-icon="color"
              /></div>
            </div>
          </div>
          <div class="box">
            <div class="button-container">
              <button  type="button" class="button"  @click="moveItem(index, -1);"><FormKitIcon icon="caretUp" /></button>
              <button  type="button" class="button"  @click="moveItem(index, 1);"><FormKitIcon icon="caretDown" /></button>
              <button  type="button" class="button"  @click="deleteItem(index);"><FormKitIcon icon="trash" /></button>
              <button type="button" class="button" @click="addItem(index);"><FormKitIcon icon="add" /></button>
            </div>
          </div>
        </div>

        <div class="end-container">
          <div class="box">
              <FormKit
                type="button"
                label="Add Item"
                prefix-icon="add"
                @click="addItem(999);"
              />
          </div>
          <div class="box">
              <FormKit
                type="button"
                label="Copy as JSON"
                prefix-icon="fileDoc"
                @click="copyToClipBoardJSON();"
              />
          </div>
          <div class="box">
              <FormKit
                type="button"
                label="Copy as TSV"
                prefix-icon="list"
                @click="copyToClipBoardTSV();"
              />
          </div>
          
          
        </div>


      </div>
  </main>
  
</template>

<script>

  import pako from "pako";
  import { Base64 } from 'js-base64';
  import { useRoute } from 'vue-router'

  export default {
    data () {
      return {
        //endTimeName: "Target date and time",
        //endTime: (new Date()).toISOString().substring(0,16),
        qadi: { version: 1, date: (new Date()).toISOString().substring(0,10), ref: "", title : "Some QADI",  name: "My name is...", steps: [] },
        skip: false
      }
    },
    watch: {
      qadi: {
        handler(newValue, oldValue) {
          if (!this.skip) {
            console.log ("RTC changed", this.qadi);
            this.setUrl();
            }
          else {
            console.log ("RTC change Skipped");
          }
          this.skip = false;
        },
        deep: true
      },
      rtcparam: {
        handler(newValue, oldValue) {
          console.log ("RTC param changed", oldValue, newValue);
          let base64Result = decodeURIComponent(newValue);
          let encoded = Base64.toUint8Array(base64Result);
          let text = pako.inflate(encoded, { to: 'string' });
          console.log ("Decoded RTC", text);
          this.skip = true;
          this.qadi = JSON.parse(text);
          },
        deep: true
      }
    },
    mounted() {

      // if (localStorage.endTime) {
      //   console.log("Mounted endTime", localStorage.endTime);
      //   this.endTime = localStorage.endTime;
      // } else {
      //   this.endTime = (new Date()).toISOString().substring(0,16);
      // }

      

    //   const route = useRoute();
      
    if (this.$route.params.i) {
        console.log (".$router", this.$route.params.i);
        let base64Result = decodeURIComponent(this.$route.params.i);
        let encoded = Base64.toUint8Array(base64Result);
        let text = pako.inflate(encoded, { to: 'string' });
        console.log ("Decoded RTC", text);
        this.skip = true;
        this.qadi = JSON.parse(text);
        this.qadi.ref = this.qadi.ref || "";
        this.qadi.date = this.qadi.date || (new Date()).toISOString().substring(0,10);
    } else if(localStorage.qadi) {
        this.qadi = JSON.parse(localStorage.qadi);
        this.qadi.ref = this.qadi.ref || "";
        this.qadi.date = this.qadi.date || (new Date()).toISOString().substring(0,10);
    } else {
      this.qadi = {
        version: 1,
        title : "Some QADI",  
        name: "My name is...",
        date: (new Date()).toISOString().substring(0,10),
        ref: "",
        steps: [
          {
            id: 1,
            name: "Dave",
            quality: 30,
            attitude :10,
            deadline: 30,
            innovation: 10
          },
          {
            id: 2,
            name: "Sally",
            quality: 30,
            attitude :10,
            deadline: 30,
            innovation: 10
          }
        ]
      }
    }

      // if (localStorage.qadi) {
      //   this.qadi = JSON.parse(localStorage.qadi);
      // } else {
        
      // }
      
    },
    computed: {
        rtcparam() {
          return this.$route.params.i
        }
    },
    methods: {
      moveItem(index, direction) {
        if (this.qadi && this.qadi.steps && this.qadi.steps.length > 1) {
          if (direction > 0) {
            // Move down
            if (index < (this.qadi.steps.length - 1)) {
              let el = this.qadi.steps[index];
              this.skip = true;
              this.qadi.steps[index] = this.qadi.steps[index + 1];
              this.skip = true;
              this.qadi.steps[index + 1] = el;
              this.setUrl();
            }
          } else {
            // Move up
            if (index > 0) {
              let el = this.qadi.steps[index];
              this.skip = true;
              this.qadi.steps[index] = this.qadi.steps[index - 1];
              this.skip = true;
              this.qadi.steps[index - 1] = el;
              this.setUrl();
            }
          }
        }
      },
      deleteItem(index) {
        console.log ("deleteItem", index, JSON.stringify(this.qadi.steps));
        if (this.qadi && this.qadi.steps && index < this.qadi.steps.length) {
          this.skip = true;
          if (index > 0) {
            this.qadi.steps.splice(index, 1);
            console.log ("after Splice", JSON.stringify(this.qadi.steps));
          } else {
            this.qadi.steps.shift();
            console.log ("after Shift", JSON.stringify(this.qadi.steps));
          }
          this.setUrl();
        }
      },
      addItem(index) {
        console.log ("addItem", index, this.qadi.steps.length);
        let maxId = 0;
        if (this.qadi.steps.length > 0) {
          maxId = Math.max(...this.qadi.steps.map(c => c.id));
        }
        if (this.qadi && this.qadi.steps) {
          this.skip = true;
          if (index >= (this.qadi.steps.length - 1)) {
            this.qadi.steps.push({
              id: maxId + 1,
              name: "Item " + (maxId + 1),
              quality: 30,
              attitude :10,
              deadline: 30,
              innovation: 10
            });
          } else {
            this.qadi.steps.splice(index + 1, 0, {
              id: maxId + 1,
              name: "Item " + (maxId + 1),
              quality: 30,
              attitude :10,
              deadline: 30,
              innovation: 10
            });
          }
          this.setUrl();
        }
      },
      setUrl() {
        let text = JSON.stringify(this.qadi);
        localStorage.qadi = text;
        let encoded = pako.deflate(text);
        let result = Base64.fromUint8Array(encoded);
        //console.log ("RTC encoded", JSON.stringify(this.qadi), encoded, result, encodeURIComponent(result));
        //this.$router.push('/' + encodeURIComponent(result));
        this.$router.push({name: 'home', params: {i : encodeURIComponent(result)}});
      },
      copyToClipBoardJSON() {
        let text = JSON.stringify(this.qadi);
        navigator.clipboard.writeText(text);
      },
      copyToClipBoardTSV() {
        let text = "";
        this.qadi.steps.forEach((item, index) => {
          text += (index + 1) +  '\t' + this.qadi.date + '\t' + this.qadi.ref +  '\t' + this.qadi.title + '\t' + this.qadi.name + '\t' + item.name + '\t' + item.quality + '\t' + item.attitude + '\t' + item.deadline + '\t' + item.innovation + '\n'
        })
        navigator.clipboard.writeText(text);
      }
    }
  }
  </script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.steps-container {
  display: flex;
  flex-wrap:nowrap;
  flex-direction: column;
}

.start-container {
  display: flex;
  flex-wrap:wrap;
  flex-direction: column;
  padding: 10px;
  border: 1px solid rgb(201, 201, 201);
  margin: 5px;
  border-radius: 5px;
}
.end-container {
  display: flex;
  flex-wrap:wrap;
  flex-direction: row;
  padding: 10px;
  border: 1px solid rgb(201, 201, 201);
  margin: 5px;
  border-radius: 5px;
}
.step-container {
  display: flex;
  flex-wrap:nowrap;
  flex-direction: row;
  padding: 10px;
  border: 1px solid rgb(201, 201, 201);
  margin: 5px;
  border-radius: 5px;
}

.button-container {
     height:100%;
     display: flex;
     flex-direction: column;
     align-items: center;
     /* justify-content: center */
    }

.qadi-container{
     display: flex;
     flex-wrap:wrap;
     /* align-items: center; */
     /* justify-content: center */
    }

.qadi {
  padding: 2px;
    }

.button{
  width:30px;
  height:20px;
  margin: 2px;
  color: #0275ff;
}


.box {
  padding-left: 5px;
  padding-right: 5px;
}

.result {
  font-size: 0.8rem;
}

@media(max-width: 300px) {
  .box {
     width: 100%;
     padding-left: 5px;
     padding-right: 5px;
   }
}


@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: top;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: top;
    flex-wrap: wrap;
  }
}
</style>
