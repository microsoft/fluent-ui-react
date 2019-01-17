import * as React from 'react'
import { TeamsProcessedSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <g>
        <path
          className={classes.outlinePart}
          d="M13.832 17.145a.467.467 0 0 1 0 .675.458.458 0 0 1-.34.149H9.977v2.398c0 .5.218.886.656 1.156.328.214.807.358 1.437.43.349.042.823.062 1.422.062.13 0 .243.05.34.145.096.097.144.21.144.34 0 .13-.048.244-.144.34a.465.465 0 0 1-.34.144h-.664c-.61 0-1.182-.078-1.719-.234-.62-.177-1.112-.448-1.476-.813-.417-.416-.625-.94-.625-1.57V17h4.484c.13 0 .243.049.34.145zm-.875-5.95a2.533 2.533 0 0 1 1.34 1.34c.13.305.195.627.195.965 0 .339-.065.66-.195.96a2.562 2.562 0 0 1-1.344 1.344 2.4 2.4 0 0 1-.96.196c-.334 0-.652-.065-.954-.195-.302-.13-.57-.313-.805-.547s-.417-.503-.546-.805a2.377 2.377 0 0 1-.196-.953 2.4 2.4 0 0 1 .195-.96 2.562 2.562 0 0 1 1.344-1.345c.302-.13.622-.195.961-.195.339 0 .66.065.965.195zm-1.531.922c-.18.078-.34.188-.48.328-.147.146-.258.309-.337.489s-.117.368-.117.566c0 .198.04.387.117.566s.19.34.336.48c.14.147.301.259.48.337s.369.117.567.117c.198 0 .387-.04.567-.117s.342-.19.488-.336c.14-.14.25-.3.328-.48s.117-.369.117-.567c0-.198-.039-.387-.117-.566s-.188-.343-.328-.489c-.146-.14-.309-.25-.488-.328s-.37-.117-.567-.117c-.198 0-.387.04-.566.117zm10.558 8.57c0 .563-.193 1.03-.578 1.399-.323.312-.776.547-1.36.703a5.858 5.858 0 0 1-1.554.203 5.816 5.816 0 0 1-1.547-.203c-.584-.156-1.036-.39-1.36-.703A1.86 1.86 0 0 1 15 20.688v-5.68h6.984v5.68zm-6-4.695v4.695c0 .355.157.636.47.844.259.188.598.316 1.015.383.328.063.669.094 1.023.094.354 0 .697-.031 1.031-.094.411-.067.75-.195 1.016-.383.307-.208.461-.489.461-.843v-4.696h-5.016zm3.473-6.797a2.533 2.533 0 0 1 1.34 1.34c.13.305.195.627.195.965 0 .339-.065.66-.195.96a2.553 2.553 0 0 1-1.344 1.345c-.303.13-.623.195-.96.195-.335 0-.652-.065-.954-.195-.303-.13-.57-.313-.805-.547s-.417-.503-.547-.805a2.37 2.37 0 0 1-.195-.953c0-.338.065-.659.195-.96a2.562 2.562 0 0 1 1.344-1.345c.302-.13.622-.195.961-.195.338 0 .66.065.965.195zm-1.531.922c-.18.078-.34.188-.48.328-.147.146-.259.309-.337.489s-.117.368-.117.566c0 .198.04.387.117.566s.19.34.336.48c.14.147.301.259.48.337s.369.117.567.117c.197 0 .387-.04.567-.117s.341-.19.488-.336c.14-.14.25-.3.328-.48s.117-.369.117-.567c0-.198-.039-.387-.117-.566s-.188-.343-.328-.489c-.147-.14-.309-.25-.488-.328s-.37-.117-.567-.117c-.198 0-.387.04-.566.117z"
        />
        <path
          className={classes.filledPart}
          d="M13.977 22.984h-1.149c-.61 0-1.182-.078-1.719-.234-.62-.172-1.112-.442-1.476-.813-.417-.426-.625-.95-.625-1.57V17h4.969v5.984zM22 20.898c0 .569-.19 1.047-.57 1.438-.328.328-.78.576-1.352.742-.49.14-1.016.211-1.578.211-.558 0-1.081-.07-1.57-.21-.578-.167-1.03-.415-1.352-.743-.386-.385-.578-.864-.578-1.438V15h7v5.898zM19.457 9.195a2.533 2.533 0 0 1 1.34 1.34c.13.305.195.627.195.965 0 .339-.065.66-.195.96a2.553 2.553 0 0 1-1.344 1.345c-.303.13-.623.195-.96.195-.335 0-.652-.065-.954-.195-.303-.13-.57-.313-.805-.547s-.417-.503-.547-.805a2.37 2.37 0 0 1-.195-.953c0-.338.065-.659.195-.96a2.562 2.562 0 0 1 1.344-1.345c.302-.13.622-.195.961-.195.338 0 .66.065.965.195zm-6.5 2a2.533 2.533 0 0 1 1.34 1.34c.13.305.195.627.195.965 0 .339-.065.66-.195.96a2.562 2.562 0 0 1-1.344 1.344 2.4 2.4 0 0 1-.96.196c-.334 0-.652-.065-.954-.195-.302-.13-.57-.313-.805-.547s-.417-.503-.546-.805a2.377 2.377 0 0 1-.196-.953 2.4 2.4 0 0 1 .195-.96 2.562 2.562 0 0 1 1.344-1.345c.302-.13.622-.195.961-.195.339 0 .66.065.965.195z"
        />
      </g>
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
