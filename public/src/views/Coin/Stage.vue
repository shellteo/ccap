<template>
  <div
    v-scroll-spy
    class="service-container"
  >
    <section>
      <div class="card-bordered">
        <div class="card-bordered-header">
          <s-text
            p="2"
            semi-bold>Stage
          </s-text>
        </div>
        <div class="card-bordered-content">
          <s-container
            class="is-mobile is-paddingless"
            clean
            centered-v>
            <md-steppers
              md-vertical
              class="smb-stage">
              <md-step
                v-for="(item, i) in stageList"
                :key="i"
                :md-editable="false"
                :id="`step${item.id}`"
                :md-label="item.stage"
                :md-description="`${item.start} - ${item.end}`">
                <!--<h4>funding</h4>-->
                <table class="smb-table">
                  <tbody>
                    <tr>
                      <th>Tokens for Sale</th>
                      <td>{{ item.tokens_for_sale || 'n/a' }}</td>
                    </tr>
                    <tr>
                      <th>Softcap</th>
                      <td>{{ item.softcap || 'n/a' }}</td>
                    </tr>
                    <tr>
                      <th>Hardcap</th>
                      <td>{{ item.hardcap || 'n/a' }}</td>
                    </tr>
                    <tr>
                      <th>Personal Cap</th>
                      <td>{{ item.personalcap || 'n/a' }}</td>
                    </tr>
                  </tbody>
                </table>
              </md-step>
            </md-steppers>
            <div
              v-if="stageList.length <= 0"
              class="smb-no-data">
              <div>No Data☹️</div>
            </div>
          </s-container>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Stage',
  data () {
    return {
      stageList: []
    }
  },
  mounted () {
    this.getStage(this.$route.params.symbol)
  },
  methods: {
    async getStage (symbol) {
      this.$axios.get(`${this.apis.stage}/${symbol}`).then((res) => {
        console.log(res)
        this.stageList = res.data || []
      })
    }
  }
}
</script>

<style scoped lang="scss">
.smb-stage {
}
.smb-table {
  tbody {
    tr {
      th {
        color: rgba(0, 0, 0, 0.38);
        font-weight: 500;
        width: 150px;
      }
    }
  }
}
</style>
