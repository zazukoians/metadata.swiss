<template>
    <footer class="bg--secondary-600">
        <div class="container">
          <div class="footer-information">
            <div class="footer-information__entry">
                <h3>{{t('message.ods-footer.block_1.title') }}</h3>
                <p>{{ t('message.ods-footer.block_1.paragraph_1') }}</p>
                <p>© opendata.swiss</p>
            </div>
            <div class="footer-information__entry">
                <h3>{{t('message.ods-footer.block_2.title') }}</h3>
                <div class="footer-information__social">
                 <a class="footer__link" href="https://www.facebook.com/people/opendataswiss/61558495974785/" target="_blank">
                      <v-icon icon="fa-brands fa-facebook-f" class="icon icon--base footer-information__icon" />
                      Facebook
                  </a>
                 <a class="footer__link" href="https://www.linkedin.com/showcase/opendata-swiss/" target="_blank">
                  <v-icon icon="fa-brands fa-linkedin"  class="icon icon--base footer-information__icon"/>
                  Linkedin</a>
                 <a class="footer__link"  href="https://www.instagram.com/opendata.swiss/" target="_blank">
                  <v-icon icon="fa-brands fa-instagram" class="icon icon--base footer-information__icon" />Instagram</a>
                 <a class="footer__link"  href="https://x.com/opendataswiss" target="_blank">
                  <v-icon icon="fa-brands fa-x-twitter" class="icon icon--base footer-information__icon" />𝕏</a>
              </div>
               <v-btn
                :href="t('message.ods-footer.block_2.news_mail_href')"
                target="_blank"
                color="secondary"
                rounded="0"
                variant="outlined"
                append-icon="mdi:mdi-arrow-right"
                :title="t('message.ods-footer.block_2.news_mail_aria_label')"
                :aria-label="t('message.ods-footer.block_2.news_mail_aria_label')"
                ><strong>NewsMail</strong></v-btn>
            </div>

            <div class="footer-information__entry">
                <h3>{{t('message.ods-footer.block_3.title') }}</h3>
                <div>
                    foobar bar bar bar bar bar bar bar bar bar bar bar bar
                </div>
            </div>
          </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

</script>

<style lang="scss" scoped>

.footer-information__icon {
  font-size: 18px;
}

a {
  text-decoration: none !important;
}
</style>
