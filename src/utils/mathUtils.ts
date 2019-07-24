import * as _ from 'lodash';

export const profitPercent = (performanceReport) => ((performanceReport.balance * 100) / performanceReport.startBalance) - 100;

export const formatNumber = (i, maximumSignificantDigits = 3) => new Intl.NumberFormat('en-IE', { maximumSignificantDigits: maximumSignificantDigits }).format(i);

export const percentWins = (data) => {
    let win = 0;
    if (data.roundtrips && data.roundtrips.length) {
        _.each(data.roundtrips, function (item) {
            if (item.profit > 0) win++;
        });
        return (100 * win / data.roundtrips.length);
    }
    return 0
};
export const getMostLeastProfitable = (data, least) => {
    if (data.roundtrips && data.roundtrips.length) {
        let pVal = 0;
        if (least) {
            pVal = _.get(_.minBy(data.roundtrips, 'profit'), 'profit');
            if (pVal > 0) return 0;
        } else {
            pVal = _.get(_.maxBy(data.roundtrips, 'profit'), 'profit');
            if (pVal < 0) return 0;
        }
        return pVal;
    }
    return 0
};

export const getSum = (data, losses: Boolean = false) => {
    if (data.roundtrips && data.roundtrips.length) {
        return losses === true ? _.sumBy(data.roundtrips, o => o.profit < 0 ? o.pnl : 0) : _.sumBy(data.roundtrips, o => o.profit > 0 ? o.pnl : 0);
    }
    return 0;
};