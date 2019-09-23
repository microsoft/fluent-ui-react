export default (
  <Provider
    theme={{
      animations: {
        bounce: {
          keyframe: {
            "0%": {transform: "scale(1,1)    translateY(0)"},
            "5%": {transform: "scale(1.1,.9) translateY(0)"},
            "15%": {transform: "scale(.9,1.1) translateY(-25px)"},
            "28%": {transform: "scale(1,1)    translateY(0)"}
          },
          delay: "1s",
          duration: "3s",
          iterationCount: "infinite"
        }
      }
    }}
    style={{background: "none"}}
  >
    <Animation name="bounce">
      <div
        style={{
          width: "5rem",
          height: "5rem",
          background: "rgb(190, 154, 255)",
          borderRadius: "50%"
        }}
      />
    </Animation>
  </Provider>
)
