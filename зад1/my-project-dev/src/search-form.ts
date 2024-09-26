import { renderBlock } from './lib.js'

export function renderSearchFormBlock () {
  //newDate.setDate(date1.getDate() + 7)
  var date1 = new Date()
  var dateToday = new Date()
  var dateToday1 = dateToday.setDate(date1.getDate() + 1)
  var dateToday2 = dateToday.setDate(date1.getDate() + 3)
  var dateTodIn = new Date(dateToday1).toISOString().slice(0, 10)
  var dateTodOut = new Date(dateToday2).toISOString().slice(0, 10)
  var dateMinIn = new Date().toISOString().slice(0, 10)
  dateToday = new Date()
  var dateToday1M = dateToday.setMonth(date1.getMonth() + 1)
  //var dateToday1M1 = dateToday1M.setDate(0)
  //var dateMaxIn = new Date(dateToday1M).toISOString().slice(0, 10)
  var dateMaxIn = new Date(dateToday.getFullYear(), dateToday.getMonth() + 1, 1).toISOString().slice(0, 10)
  //console.log(dateToday)
  //console.log(dateMaxIn)
  renderBlock(
    'search-form-block',
    `
    <form>
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <!--<div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>--!>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" value=${dateTodIn} min=${dateMinIn} max=${dateMaxIn} name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" value=${dateTodOut} min=${dateMinIn} max=${dateMaxIn} name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div>
            <div><button>Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  )
}
