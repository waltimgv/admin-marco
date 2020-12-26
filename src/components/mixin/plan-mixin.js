import PlanCard from '../PlanCard';
import {mapState} from 'vuex';

export default {
  components: {
    PlanCard
  },
  computed: {
    ...mapState(['plans']),
  },
};
