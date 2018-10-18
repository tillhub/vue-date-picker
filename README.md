# @tillhub/vue-date-picker
> A date picker that allows user to select a range, quick pick dates, and select custom ranges

## Install

```bash
npm install --save @tillhub/vue-date-picker
```

## Demo

npm run storybook

## Usage

```

<template>
  <VueDatePicker 
    locale="de"
    tintColor="#357ebd"
    buttonLabel="All Time"
    buttonWidth="auto"
    :hideDateInButton="false"
    :showTime="false"
    :initCustomToggle="true"
    @getDates="printTheDate"/>
</template>

<script>

import VueDatePicker from '@tillhub/vue-date-picker'
import '@tillhub/vue-date-picker/dist/vue-date-picker.css'

export default {
  name: 'App',
  components: {
    VueDatePicker
  },
  methods: {
    printTheDate(selected){
      console.log("I gots the dates! ", selected)
    }
  },
}
</script>

```

### Properties

The components accepts optional properties.

| Property          | type    | required | example             | default      | description                                                                |
| ----------------- | ------  | -------- | --------------------| ------------ | -------------------------------------------------------------------------- |
| locale            | string  | no       | "de" or "en"        | "en"         | Currently only German and English is supported. Only 'de' and 'en ' are    |
| tintColor         | string  | no       | "#50e3c1"           | "#357ebd"    | This allows customized color of the highlighted date range on the calender |
| buttonLabel       | string  | no       | "All Time"          | "Select"     | Customized Button Lable to override default                                |
| buttonWidth       | string  | no       | "100px"             | "auto"       | Overrides the button width, but default it adjust to content               |
| :hideDateInButton | boolean | no       | true                | false        | Overrides the applied date being showed in place of Button label           |
| :showTime         | boolean | no       | false               | true         | Overrides the time being shown next to the date                            |
| :initCustomToggle | boolean | no       | false               | true         | Activates or de-activate Custom toggle at the bottom on inital open        |

### Event
The Date picker with only return the selected date from the component when the Applied button is clicked. It will return an object { start: new Date(), end: new Date()} with a start and an end key. The dates will be in a javascript date object see https://www.w3schools.com/js/js_dates.asp.

| Event     | type     | example              | default | description                                                                                                                    |
| --------- | -------- | -------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------- |
| @getDates | fuction  | (selected dates)=>{} | n/a     | Passes the selected dates when the applied button is clicked and will return an object  { start: new Date(), end: new Date()}  |


## License

MIT © [qtotuan](https://github.com/qtotuan) 
