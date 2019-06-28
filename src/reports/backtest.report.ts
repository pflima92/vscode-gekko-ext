import * as _ from 'lodash'
import * as humanizeDuration from 'humanize-duration'
import * as moment from 'moment'

const num = (i, maximumSignificantDigits = 3) => new Intl.NumberFormat('en-IE', { maximumSignificantDigits: maximumSignificantDigits }).format(i);
const color = (i, varargs: any = '', fun = x => i >= 0) => `<span style="color: ${fun(i) ? 'green' : 'red'}" >${num(i)}${varargs}</span>`;
const arrow = (i) => i >= 0 ? '(+)' : '(-)';

const percentWins = (data) => {
   let win = 0;
      if(data.roundtrips && data.roundtrips.length){
        _.each(data.roundtrips, function(item){
          if(item.profit > 0) win++;
        });
        return (100 * win / data.roundtrips.length);
      }
      return 0
};
const getMostLeastProfitable = (data, least) => {
   if(data.roundtrips && data.roundtrips.length){
      let pVal = 0;
      if(least) {
        pVal = _.get(_.minBy(data.roundtrips, 'profit'), 'profit');
        if (pVal > 0) return 0;
      } else {
        pVal = _.get(_.maxBy(data.roundtrips, 'profit'),'profit');
        if(pVal < 0) return 0;
      }
      return pVal;
    }
    return 0
};

const profitPercent = (data) => ((data.balance * 100) / data.startBalance) - 100;

const getSum = (data, losses: Boolean = false) => {
   if(data.roundtrips && data.roundtrips.length) {
      return losses === true ? _.sumBy(data.roundtrips, o => o.profit < 0 ? o.pnl : 0) : _.sumBy(data.roundtrips, o => o.profit > 0 ? o.pnl : 0);
    }
    return 0;
};

export default (res: any) => {

   if(!res.performanceReport){
      return '<p><strong>Given backtest does not registered any performance report. Please validate your watch parameters or check your strategy logs.</strong></p>';
   }

    let report = `
    <h1>Backtest Result</h1>
<p>This Backtest result was executed through Gekko: <em>${res.serverAddress}</em></p>
<p><strong>Backtest Overview</strong></p>
<table width="397">
   <tbody>
      <tr>
         <td><strong>Strategy Name:</strong></td>
         <td>${res.name}</td>
         <td></td>
         <td><strong>Exchange:</strong></td>
         <td>${res.market.exchange}</td>
      </tr>
      <tr>
         <td><strong>Currency:</strong></td>
         <td>${res.market.currency}</td>
         <td></td>
         <td><strong>Candle Size:</strong></td>
         <td>${res.tradingAdvisor.candleSize}</td>
      </tr>
      <tr>
         <td><strong>Asset:</strong></td>
         <td>${res.market.asset}</td>
         <td></td>
         <td><strong>History Size:</strong></td>
         <td>${res.tradingAdvisor.historySize}</td>
      </tr>
   </tbody>
</table>
<p></p>
<p><strong>Performance Report:</strong></p>
<p></p>
<table style="height: 173px;" width="630">
   <tbody>
      <tr>
         <td style="width: 119px;"><strong>Start Time:</strong></td>
         <td style="width: 119px;">${res.performanceReport.startTime}</td>
         <td style="width: 119px;"></td>
         <td style="width: 119px;"><strong>Amount of trades:</strong></td>
         <td style="width: 120px;">${res.performanceReport.trades}</td>
      </tr>
      <tr>
         <td style="width: 119px;"><strong>End Time:</strong></td>
         <td style="width: 119px;">${res.performanceReport.endTime}</td>
         <td style="width: 119px;"></td>
         <td style="width: 119px;"><strong>Sharpe ratio:</strong></td>
         <td style="width: 120px;">${num(res.performanceReport.sharpe)}</td>
      </tr>
      <tr>
         <td style="width: 119px;"><strong>Timespan:</strong></td>
         <td style="width: 119px;">${res.performanceReport.timespan}</td>
         <td style="width: 119px;"></td>
         <td style="width: 119px;"><strong>Start Balance:</strong></td>
         <td style="width: 120px;">${num(res.performanceReport.startBalance, 4)}</td>
      </tr>
      <tr>
         <td style="width: 119px;"><strong>Start price:</strong></td>
         <td style="width: 119px;">${res.performanceReport.startPrice}</td>
         <td style="width: 119px;"></td>
         <td style="width: 119px;"><strong>End Balance:</strong></td>
         <td style="width: 120px;">${num(res.performanceReport.balance, 4)}</td>
      </tr>
      <tr>
         <td style="width: 119px;"><strong>End price:</strong></td>
         <td style="width: 119px;">${res.performanceReport.endPrice}</td>
         <td style="width: 119px;"></td>         
      </tr>
      <tr>
         <td style="width: 119px;"><strong>Market:</strong></td>
         <td style="width: 119px;">${color(res.performanceReport.market)}</td>
         <td style="width: 119px;"></td>
         <td style="width: 119px;"><strong>Simulated Profit (percent):</strong></td>
         <td style="width: 120px;">${color(profitPercent(res.performanceReport), '%')}</td>
      </tr>
   </tbody>
</table>

<div>
   <h4>Roundtrips</h4>
   <table style="height: 29px;" width="619">
      <tbody>
         <tr>
            <td style="width: 70px;">Percent Wins:</td>
            <td style="width: 71px;"><strong>${num(percentWins(res))}</strong></td>
            <td style="width: 71px;"></td>
            <td style="width: 71px;">Best Win:</td>
            <td style="width: 71px;">${color(getMostLeastProfitable(res, false))}</td>
            <td style="width: 71px;"></td>
            <td style="width: 71px;">Worst loss:</td>
            <td style="width: 71px;">${color(getMostLeastProfitable(res, true))}</td>
         </tr>
         <tr>
            <td style="width: 70px;">Profit/Loss:</td>
            <td style="width: 71px;"><strong>${num(getSum(res) + getSum(res, true))}</strong></td>
            <td style="width: 71px;"></td>
            <td style="width: 71px;">Sum Profits:</td>
            <td style="width: 71px;">${color(getSum(res))}</td>
            <td style="width: 71px;"></td>
            <td style="width: 71px;">Sum losses:</td>
            <td style="width: 71px;">${color(getSum(res, true))}</td>
         </tr>
      </tbody>
   </table>
   
   <div>
      <div>
         <table>
            <thead>
               <tr>
                  <th>Entry at (UTC)</th>
                  <th>Exit at (UTC)</th>
                  <th>Exposure</th>
                  <th>Entry balance</th>
                  <th>Exit balance</th>
                  <th>P&amp;L</th>
                  <th>%</th>
               </tr>
            </thead>
            <tbody>
               `
        +

        res.roundtrips.map((r: any) => `
                <tr>
                  <td>${ moment.unix(r.entryAt).format("MM/DD/YYYY hh:mm") }</td>
                  <td>${ moment.unix(r.exitAt).format("MM/DD/YYYY hh:mm") }</td>
                  <td>${humanizeDuration(r.duration)}</td>
                  <td>${num(r.entryBalance)}</td>
                  <td>${num(r.exitBalance)}</td>
                  <td><strong>${num(r.pnl)} </strong></td>
                  <td>
                     <p><strong>${color(r.profit, `% <em>${arrow(r.profit)}</em>`)}</strong></p>
                  </td>
               </tr>
                `).join()
        +

        `
            </tbody>
         </table>
      </div>
      <div></div>
   </div>
</div>
    `;

    return report;
};