# @tillhub/vue-date-picker [![CircleCI](https://circleci.com/gh/tillhub/vue-date-picker/tree/master.svg?style=svg)](https://circleci.com/gh/tillhub/vue-date-picker/tree/master)
> A date picker that allows user to select a range, quick pick dates, and select custom ranges

## Install

```bash
npm install --save @tillhub/vue-date-picker
```

## Demo

```bash
npm run storybook
```

## Usage

```html
<template>
  <vue-date-picker
    locale="de"
    tintColor="#357ebd"
    buttonLabel="All Time"
    buttonWidth="auto"
    :hideDateInButton="false"
    :showTime="false"
    :initCustomToggle="true"
    @get-dates="printTheDate"/>
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

| Property             | type    | required | example                                                    | default   | description                                                                          |
|:-------------------- |:--------|:---------|:-----------------------------------------------------------|:----------|:------------------------------------------------------------------------------------ |
| locale               | string  | no       | "de" or "en"                                               | "en"      | Currently only German and English is supported. Only 'de' and 'en '                  |
| tint-color           | string  | no       | "#50e3c1"                                                  | "#357ebd" | This allows customized color of the highlighted date range on the calender           |
| button-label         | string  | no       | "All Time"                                                 | "Select"  | Customized Button Lable to override default                                          |
| button-width         | string  | no       | "100px"                                                    | "auto"    | Overrides the button width, but default it adjust to content                         |
| date-type            | string  | no       | "iso" or "date"                                            | "date"    | Formates the get-dates (start/end) to eiter date format or ISO string format         |
| :hide-date-in-button | boolean | no       | true                                                       | false     | Overrides the applied date being showed in place of Button label                     |
| :show-time           | boolean | no       | false                                                      | true      | Overrides the time being shown next to the date                                      |
| :init=custom-toggle  | boolean | no       | false                                                      | true      | Activates or de-activate Custom toggle at the bottom on inital open                  |
| :simple              | boolean | no       | true                                                       | false     | This will only have the date-range calender select options                           |
| :clearable           | boolean | no       | true                                                       | false     | An X icon will appear on the button that will clear date and return {} on @get-dates |
| :date-range          | object  | no       | { start: new Date(),<br/> end: "2018-11-13T23:00:00.000Z",<br/> showDateText: true } | true      | Allows the date-range to be past in. The obejct must include a 'start' and 'end' key with a date value or an ISO sting. 'showDateText' (optional) must be a boolean and will over ride the button lable and message above the calender to be the date range. It defaults to false |

### Event

The Date picker with only return the selected date from the component when the Applied button is clicked. It will return an object { start: new Date(), end: new Date()} with a start and an end key. The dates will be in a javascript date object see https://www.w3schools.com/js/js_dates.asp.

| Event      | type    | example              | default | description                                                                                                                   |
|:-----------|:--------|:---------------------|:--------|:------------------------------------------------------------------------------------------------------------------------------|
| @get-dates | fuction | (selected dates)=>{} | n/a     | Passes the selected dates when the applied button is clicked and will return an object  { start: new Date(), end: new Date(), showDateText: true} |
| @clear     | fuction | ()=>{}               | n/a     | When 'clearable' props is true, this event emmits when the clear x is clicked |
## License

MIT © [qtotuan](https://github.com/qtotuan)
