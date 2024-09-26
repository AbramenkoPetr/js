import { renderBlock } from './lib.js';
export function renderSearchFormBlock() {
    //newDate.setDate(date1.getDate() + 7)
    var date1 = new Date();
    var dateToday = new Date();
    var dateToday1 = dateToday.setDate(date1.getDate() + 1);
    var dateToday2 = dateToday.setDate(date1.getDate() + 3);
    var dateTodIn = new Date(dateToday1).toISOString().slice(0, 10);
    var dateTodOut = new Date(dateToday2).toISOString().slice(0, 10);
    var dateMinIn = new Date().toISOString().slice(0, 10);
    dateToday = new Date();
    var dateToday1M = dateToday.setMonth(date1.getMonth() + 1);
    //var dateToday1M1 = dateToday1M.setDate(0)
    //var dateMaxIn = new Date(dateToday1M).toISOString().slice(0, 10)
    var dateMaxIn = new Date(dateToday.getFullYear(), dateToday.getMonth() + 1, 1).toISOString().slice(0, 10);
    //console.log(dateToday)
    //console.log(dateMaxIn)
    renderBlock('search-form-block', `
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
    `);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWZvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VhcmNoLWZvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUV0QyxNQUFNLFVBQVUscUJBQXFCO0lBQ25DLHNDQUFzQztJQUN0QyxJQUFJLEtBQUssR0FBRyxJQUFJLElBQUksRUFBRSxDQUFBO0lBQ3RCLElBQUksU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUE7SUFDMUIsSUFBSSxVQUFVLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDdkQsSUFBSSxVQUFVLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDdkQsSUFBSSxTQUFTLEdBQUcsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQTtJQUMvRCxJQUFJLFVBQVUsR0FBRyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQ2hFLElBQUksU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQTtJQUNyRCxTQUFTLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQTtJQUN0QixJQUFJLFdBQVcsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUMxRCwyQ0FBMkM7SUFDM0Msa0VBQWtFO0lBQ2xFLElBQUksU0FBUyxHQUFHLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxTQUFTLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDekcsd0JBQXdCO0lBQ3hCLHdCQUF3QjtJQUN4QixXQUFXLENBQ1QsbUJBQW1CLEVBQ25COzs7Ozs7Ozs7Ozs7Ozs7OzswREFpQnNELFNBQVMsUUFBUSxTQUFTLFFBQVEsU0FBUzs7OzsyREFJMUMsVUFBVSxRQUFRLFNBQVMsUUFBUSxTQUFTOzs7Ozs7Ozs7Ozs7S0FZbEcsQ0FDRixDQUFBO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlbmRlckJsb2NrIH0gZnJvbSAnLi9saWIuanMnXG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJTZWFyY2hGb3JtQmxvY2sgKCkge1xuICAvL25ld0RhdGUuc2V0RGF0ZShkYXRlMS5nZXREYXRlKCkgKyA3KVxuICB2YXIgZGF0ZTEgPSBuZXcgRGF0ZSgpXG4gIHZhciBkYXRlVG9kYXkgPSBuZXcgRGF0ZSgpXG4gIHZhciBkYXRlVG9kYXkxID0gZGF0ZVRvZGF5LnNldERhdGUoZGF0ZTEuZ2V0RGF0ZSgpICsgMSlcbiAgdmFyIGRhdGVUb2RheTIgPSBkYXRlVG9kYXkuc2V0RGF0ZShkYXRlMS5nZXREYXRlKCkgKyAzKVxuICB2YXIgZGF0ZVRvZEluID0gbmV3IERhdGUoZGF0ZVRvZGF5MSkudG9JU09TdHJpbmcoKS5zbGljZSgwLCAxMClcbiAgdmFyIGRhdGVUb2RPdXQgPSBuZXcgRGF0ZShkYXRlVG9kYXkyKS50b0lTT1N0cmluZygpLnNsaWNlKDAsIDEwKVxuICB2YXIgZGF0ZU1pbkluID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNsaWNlKDAsIDEwKVxuICBkYXRlVG9kYXkgPSBuZXcgRGF0ZSgpXG4gIHZhciBkYXRlVG9kYXkxTSA9IGRhdGVUb2RheS5zZXRNb250aChkYXRlMS5nZXRNb250aCgpICsgMSlcbiAgLy92YXIgZGF0ZVRvZGF5MU0xID0gZGF0ZVRvZGF5MU0uc2V0RGF0ZSgwKVxuICAvL3ZhciBkYXRlTWF4SW4gPSBuZXcgRGF0ZShkYXRlVG9kYXkxTSkudG9JU09TdHJpbmcoKS5zbGljZSgwLCAxMClcbiAgdmFyIGRhdGVNYXhJbiA9IG5ldyBEYXRlKGRhdGVUb2RheS5nZXRGdWxsWWVhcigpLCBkYXRlVG9kYXkuZ2V0TW9udGgoKSArIDEsIDEpLnRvSVNPU3RyaW5nKCkuc2xpY2UoMCwgMTApXG4gIC8vY29uc29sZS5sb2coZGF0ZVRvZGF5KVxuICAvL2NvbnNvbGUubG9nKGRhdGVNYXhJbilcbiAgcmVuZGVyQmxvY2soXG4gICAgJ3NlYXJjaC1mb3JtLWJsb2NrJyxcbiAgICBgXG4gICAgPGZvcm0+XG4gICAgICA8ZmllbGRzZXQgY2xhc3M9XCJzZWFyY2gtZmlsZWRzZXRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiY2l0eVwiPtCT0L7RgNC+0LQ8L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0IGlkPVwiY2l0eVwiIHR5cGU9XCJ0ZXh0XCIgZGlzYWJsZWQgdmFsdWU9XCLQodCw0L3QutGCLdCf0LXRgtC10YDQsdGD0YDQs1wiIC8+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cImhpZGRlblwiIGRpc2FibGVkIHZhbHVlPVwiNTkuOTM4NiwzMC4zMTQxXCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8IS0tPGRpdiBjbGFzcz1cInByb3ZpZGVyc1wiPlxuICAgICAgICAgICAgPGxhYmVsPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPVwicHJvdmlkZXJcIiB2YWx1ZT1cImhvbXlcIiBjaGVja2VkIC8+IEhvbXk8L2xhYmVsPlxuICAgICAgICAgICAgPGxhYmVsPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPVwicHJvdmlkZXJcIiB2YWx1ZT1cImZsYXQtcmVudFwiIGNoZWNrZWQgLz4gRmxhdFJlbnQ8L2xhYmVsPlxuICAgICAgICAgIDwvZGl2Pi0tIT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImNoZWNrLWluLWRhdGVcIj7QlNCw0YLQsCDQt9Cw0LXQt9C00LA8L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0IGlkPVwiY2hlY2staW4tZGF0ZVwiIHR5cGU9XCJkYXRlXCIgdmFsdWU9JHtkYXRlVG9kSW59IG1pbj0ke2RhdGVNaW5Jbn0gbWF4PSR7ZGF0ZU1heElufSBuYW1lPVwiY2hlY2tpblwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJjaGVjay1vdXQtZGF0ZVwiPtCU0LDRgtCwINCy0YvQtdC30LTQsDwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJjaGVjay1vdXQtZGF0ZVwiIHR5cGU9XCJkYXRlXCIgdmFsdWU9JHtkYXRlVG9kT3V0fSBtaW49JHtkYXRlTWluSW59IG1heD0ke2RhdGVNYXhJbn0gbmFtZT1cImNoZWNrb3V0XCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIm1heC1wcmljZVwiPtCc0LDQutGBLiDRhtC10L3QsCDRgdGD0YLQvtC6PC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCBpZD1cIm1heC1wcmljZVwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9XCJcIiBuYW1lPVwicHJpY2VcIiBjbGFzcz1cIm1heC1wcmljZVwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXY+PGJ1dHRvbj7QndCw0LnRgtC4PC9idXR0b24+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9maWVsZHNldD5cbiAgICA8L2Zvcm0+XG4gICAgYFxuICApXG59XG4iXX0=