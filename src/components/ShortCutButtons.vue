<template>
  <el-row
    type="flex"
    class="p-sm"
    justify="space-between">
    <div>
      <el-button
        plain
        type="text"
        class="goToButton"
        :class="{ active: shortCutButton === 'today' }"
        @click="goToToday">{{ getTranlation("today") }}</el-button>
      <el-button
        plain
        type="text"
        class="goToButton"
        :class="{ active: shortCutButton === 'yesterday' }"
        @click="goToYesterday">{{ getTranlation("yesterday") }}</el-button>
    </div>
    <div>
      <el-button
        plain
        type="text"
        class="goToButton"
        :class="{ active: shortCutButton === 'thisWeek' }"
        @click="goToThisWeek">{{ getTranlation("thisWeek") }}</el-button>
      <el-button
        plain
        type="text"
        class="goToButton"
        :class="{ active: shortCutButton === 'lastWeek' }"
        @click="goToLastWeek">{{ getTranlation("lastWeek") }}</el-button>
    </div>
    <div>
      <el-button
        plain
        type="text"
        class="goToButton"
        :class="{ active: shortCutButton === 'thisMonth' }"
        @click="goToThisMonth">{{ getTranlation("thisMonth") }}</el-button>
      <el-button
        plain
        type="text"
        class="goToButton"
        :class="{ active: shortCutButton === 'lastMonth' }"
        @click="goToLastMonth">{{ getTranlation("lastMonth") }}</el-button>
    </div>
    <div>
      <el-button
        plain
        type="text"
        class="goToButton"
        :class="{ active: shortCutButton === 'thisYear' }"
        @click="goToThisYear">{{ getTranlation("thisYear") }}</el-button>
      <el-button
        plain
        type="text"
        class="goToButton"
        :class="{ active: shortCutButton === 'lastYear' }"
        @click="goToLastYear">{{ getTranlation("lastYear") }}</el-button>
    </div>
  </el-row>
</template>

<script>
import en from '../i18n/en.json'
import de from '../i18n/de.json'

export default {
  name: 'ShortCutButtons',
  props: {
    shortCutButton: {
      type: String,
      required: false,
      default: ''
    },
    locale: {
      type: String,
      required: true
    }
  },
  methods: {
    getTranlation: function (key) {
      if (this.getLocale() === 'en') {
        return en[key]
      } else {
        return de[key]
      }
    },
    getLocale: function () {
      let locale = this.locale || this.$i18n.locale || 'en'
      locale = locale.substring(0, 2).toLowerCase()
      if (locale === 'en' || locale === 'de') {
        return locale
      } else {
        return 'en'
      }
    },
    goToToday: function () {
      const today = new Date()
      this.$emit('update-short-cut', 'today')
      this.$emit('update-calendar', today, today)
    },
    goToYesterday: function () {
      let yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      this.$emit('update-short-cut', 'yesterday')
      this.$emit('update-calendar', yesterday, yesterday)
    },
    goToThisWeek: function () {
      let start = new Date()
      let end = new Date()
      let days = start.getDate() - start.getDay()
      start.setDate(days)
      end.setDate(days + 6)
      this.$emit('update-short-cut', 'thisWeek')
      this.$emit('update-calendar', start, end)
    },
    goToLastWeek: function () {
      let start = new Date()
      let end = new Date()
      let days = start.getDate() - start.getDay() - 7
      start.setDate(days)
      end.setDate(days + 6)
      this.$emit('update-short-cut', 'lastWeek')
      this.$emit('update-calendar', start, end)
    },
    goToThisMonth: function () {
      var date = new Date()
      const start = new Date(date.getFullYear(), date.getMonth(), 1)
      const end = new Date(date.getFullYear(), date.getMonth() + 1, 0)
      this.$emit('update-short-cut', 'thisMonth')
      this.$emit('update-calendar', start, end)
    },
    goToLastMonth: function () {
      var date = new Date()
      const start = new Date(date.getFullYear(), date.getMonth() - 1, 1)
      const end = new Date(date.getFullYear(), date.getMonth(), 0)
      this.$emit('update-short-cut', 'lastMonth')
      this.$emit('update-calendar', start, end)
    },
    goToThisYear: function () {
      var date = new Date()
      const start = new Date(date.getFullYear(), 0, 1)
      const end = new Date(date.getFullYear() + 1, 0, 0)
      this.$emit('update-short-cut', 'thisYear')
      this.$emit('update-calendar', start, end)
    },
    goToLastYear: function () {
      var date = new Date()
      const start = new Date(date.getFullYear() - 1, 0, 1)
      const end = new Date(date.getFullYear(), 0, 0)
      this.$emit('update-short-cut', 'lastYear')
      this.$emit('update-calendar', start, end)
    }
  }
}
</script>

<style scoped>
.goToButton {
  padding: 5px;
  display: block;
  margin-left: 0px;
  color: #a7abb0;
}

.active {
  color: #259ff6;
}
</style>
