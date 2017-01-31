import FragmentTransform from './fragment';
import map from '../util/map';

/**
  @module ember-data-model-fragments
*/

/**
  Transform for `MF.fragmentArray` fragment attribute which delegates work to
  the fragment type's serializer

  @class FragmentArrayTransform
  @namespace MF
  @extends DS.Transform
*/
const FragmentArrayTransform = FragmentTransform.extend({
  deserialize: function deserializeFragmentArray(data) {
    if (data == null) {
      return null;
    }

    return map(data, datum => {
      return this.deserializeSingle(datum);
    }, this);
  },

  serialize: function serializeFragmentArray(snapshots) {
    if (!snapshots) {
      return null;
    }

    let store = this.store;

    return map(snapshots, snapshot => {
      let serializer = store.serializerFor(snapshot.modelName);
      return serializer.serialize(snapshot);
    });
  }
});

export default FragmentArrayTransform;
