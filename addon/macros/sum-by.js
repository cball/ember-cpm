import Ember from 'ember';

var get = Ember.get;
var reduceComputed = Ember.reduceComputed;

function logWarning(typeName, propName) {
  var message = '[DEPRECATED: EmberCPM/sumBy] - %@ - %@'.fmt(typeName, propName);
  if (console.groupCollapsed) {
    // modern browsers
    console.groupCollapsed(message);
    console.info('Please use a combination of EmberCPM.Macros.sum and EmberCPM.Macros.mapBy');
    console.info('EmberCPM.Macros.sum(EmberCPM.Macros.mapBy("list", "value"))');
    if (console.trace) {
      console.trace();
    }
    console.groupEnd();
  }
  else {
    // legacy browsers
    Ember.Logger.warn(message);
  }
}

/**
 * DEPRECATED - 10/14/2014
 * Rather than use sumBy, developers should use composed computed property macros
 *
 * OLD WAY
 * {
 *   list: [{id: 1, val: 5.0}, {id: 2, val: 2.0}],
 *   listValSum: sumBy('list', 'val')
 * }
 *
 * NEW WAY
 * {
 *   list: [{id: 1, val: 5.0}, {id: 2, val: 2.0}],
 *   listValSum: sum(mapBy('list', 'val'))
 * }
 */

export default function EmberCPM_sumBy(dependentKey, propertyKey) {
  return reduceComputed(dependentKey + '.@each.' + propertyKey, {
    initialValue: 0.0,

    addedItem: function(accumulatedValue, item /*, changeMeta, instanceMeta */){
      logWarning(this.constructor.toString(), dependentKey);
      return accumulatedValue + parseFloat(get(item, propertyKey));
    },

    removedItem: function(accumulatedValue, item /*, changeMeta, instanceMeta */){
      logWarning(this.constructor.toString(), dependentKey);
      return accumulatedValue - parseFloat(get(item, propertyKey));
    }
  });
}
