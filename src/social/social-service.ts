
import { socialRouting } from '../social/social-routing.js'
import { Service } from '../common/service.js'

/**
 * The Social Service 
 */
export class SocialService extends Service {

  constructor() {
    super()
  }

  override async start(port:number) {
    // Setup API Routing
    socialRouting(this.app)

    // Start Service App
    this.app.listen(port, ()=> {
      console.log('Social Service is running')
    })
  }
}

export default function startSocialService(port:number): SocialService {
  const service = new SocialService()
  service.start(port)
  return service
}
