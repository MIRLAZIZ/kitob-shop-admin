import { createMongoAbility } from '@casl/ability'
import { abilitiesPlugin } from '@casl/vue'

export default function (app) {
  const userAbilityRules = useCookie('userAbilityRules')
  const initialAbility = createMongoAbility(userAbilityRules.value ?? [])
  let user = null


  app.use(abilitiesPlugin, initialAbility, {
    useGlobalProperties: true,
  })
}
