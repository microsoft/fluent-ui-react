import * as React from 'react'
import DocPage from '../components/DocPage/DocPage'
import CodeSnippet from '../components/CodeSnippet'
import GuidesNavigationFooter from '../components/GuidesNavigationFooter'

import { Header, Segment } from '@stardust-ui/react'

const code = (content: string): React.ReactNode => <code>{content}</code>

const link = (content: string, url: string): React.ReactNode => (
  <React.Fragment>
    {' '}
    <a href={url} target={url.startsWith('http') ? '_blank' : '_self'}>
      {content}
    </a>
  </React.Fragment>
)

export default () => (
  <DocPage title="Accessibility in Stardust">
    <Header as="h2" content="Goals of Accessibility" />

    <p>
      As much as possible, accessibility should just work when you put together and integrate
      Stardust components. Specially users should be able to navigate around the application using
      the keyboard or screen readers, and virtual screen reader navigation modes are supported by
      default, and high contrast themes are provided.
    </p>
    <p>
      The components themselves have accessibility build in - so, for example, a dropdown menu will
      be focusable, you can navigate between the options with arrow keys, and select the desired
      option. Of course, if you want to enhance / override the default behaviour this is also
      supported.
    </p>
    <p>
      The consumer of the library should generally be shielded from the intricates of applying the
      correct ARIA roles, testing on multiple screen reader / os combinations.
    </p>
    <p>
      While Stardust itself focuses on providing keyboard navigation, screen reader support, zooming
      and high contrast themes, there are other, perhaps broader considerations to be taken into
      account when designing applications for accessibility. In particular the ordering and choice
      of elements within the page is critical and discussed in more detail below.
    </p>
    <p>
      Stardust attempts to follow the
      {link('ARIA best practises', 'https://www.w3.org/TR/wai-aria-practices-1.1/')} and validates
      them with subject matter experts.
    </p>

    <Header as="h3" content="Out of Scope" />
    <p>
      Internationalization, globalization, keyboard shortcuts and language detection are
      deliberately not part of Stardust and should be handled by the hosting application.
    </p>

    <Header as="h2" content="Making an app / page accessible" />
    <p>
      Besides component level accessibility there are application level / page level considerations,
      mostly regarding the logical structure. Follow
      {link(
        'ARIA Landmarks Example',
        'https://www.w3.org/TR/wai-aria-practices/examples/landmarks/index.html',
      )}{' '}
      to identify and implement page areas.
    </p>

    <p>
      In some cases, ARIA attributes need to be provided by the consumer of Stardust if the required
      information cannot be derived from the components.
    </p>
    <p>
      Focusable elements that do not contain any textual information need to be labelled so that the
      screen reader can present them to the user. In addition to that, information that is relevant
      to the screen reader user only can be added to the label:
    </p>
    <CodeSnippet
      value={`
        <>
          <Button icon='envelope' />
          <Button icon='envelope' aria-label='Send message' />
          <Radio aria-label='Include history from the past day. Press TAB to change the number of days.' />
        </>
      `}
    />
    <p>
      Most typical examples are {code('aria-label')}, {code('aria-labelledby')} and {code('title')}{' '}
      attributes. In some cases the values need to be dynamically changed based on the state of the
      component/application.
    </p>

    <Header as="h2" content="Semantic HTML" />
    <p>
      While Stardust goes a long way in making the application accessible by default, it does build
      on having correct semantic HTML as the base.
    </p>
    <p>
      One way to look at this is that by looking at the HTML, you should immediately be able to see
      what the function is on every part of the page. For example,{' '}
    </p>
    <CodeSnippet
      value={`
        <Button size='small' color='green'>
          <Icon name='download' />
          Download
        </Button>
      `}
    />

    <p>
      This is a simple example, clearly here the intent is to display a small green button with an
      icon labelled 'Download'. HTML representation is semantically correct and specifies essential
      {code('aria-*')} attributes:
    </p>
    <CodeSnippet
      mode="html"
      value={`
        <button class='ui-button' color='green' aria-label='Download'>
          <i class='ui-icon' aria-hidden='true'></i>
          Download
        </button>
      `}
    />

    <p>Basic rules for semantically correct HTML:</p>
    <ul>
      <li>Preserve DOM order and put elements in their correct position</li>
      <li>
        Use appropriate elements (for example {code('<table>')} for a table, {code('ul')} and{' '}
        {code('li')}
        for a list)
      </li>
      <li>Use appropriate roles and {code('aria-*')} attributes</li>
    </ul>

    <Header as="h3" content="Design Considerations" />
    <p>
      Having a clear idea of how users would use the keyboard and screen readers to navigate through
      your app before development starts is critical to both getting the ordering of components
      right and choosing the correct behaviours. For example
    </p>

    <p>
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA1sAAABlCAIAAAA0xm4SAAAAAXNSR0IArs4c6QAAAAlwSFlzAAASdAAAEnQB3mYfeAAAMjxJREFUeF7tnQd4VUX6h4WEkISELr230HuVXqSDgK59ESzgogv+kV1Fdxex4a7oKlhW0CWiVOkgAtJ7J/TeuwICARL6/735dPZ4W05uCQn5znOfPDfnzpn55p055/zON/PNyRR/8cI9uikBJaAElIASUAJKQAlkYAKZM3DdtepKQAkoASWgBJSAElACDgKqCLUfKAEloASUgBJQAkogoxNQRZjRe4DWXwkoASWgBJSAElACqgi1DygBJaAElIASUAJKIKMTUEWY0XuA1l8JKAEloASUgBJQAqoItQ8oASWgBJSAElACSiCjE1BFmNF7gNZfCSgBJaAElIASUAKqCLUPKAEloASUgBJQAkogoxNQRZjRe4DWXwkoASWgBJSAElACqgi1DygBJaAElIASUAJKIKMTUEWY0XuA1l8JKAEloASUgBJQAqoItQ8oASWgBJSAElACSiCjE1BFmNF7gNZfCSgBJaAElIASUAKqCLUPKAEloASUgBJQAkogoxPIFH/xQkZnoPVXAkpACSgBJaAEgkng2rVrN27cCGYJmneKCYSGhoaFhZnDgqUIR329cNnynYmJ15I18Pbt2zeuJ5+MfMLDw5o2qfzsM62TzVMTKAEloASUgBJQAmmEgMrBNNIQrmZYRWFQRo3/G7vgx/mb7chBjMuUiU8mO7DIcO68jV9+Nc9OYk2jBJSAElACSkAJpAUC6h1MC63g1gZr0wRFEeIdtFN5hGBISObs2SP58MWeLLxnydJtdjLXNEpACSgBJaAElIASUAI2CQRFEdrxDoaEhkRHR9SvV77vi51f6tf1vgYVs0dHhoaGJGu3ncyTzUQTKAEloASUgBJQAkrALYFbt26dOXMmo7k2g6IIvfQw8QtGRYWXLJ6vW9f7nureslq10jVqlO3Zs80f/tCkZMkC0VHhSf5CW+PI2pWVgBJQAkpACSgBJaAE/CeQ2oowJDRzvnw5WrSo9nzv9h071MuXL1dYWBY++fPn6tSpwYsvPtC6Te0CBXKHhqa2Yf6j1ByUgBJQAkpACSgBJZBOCaSe8MLtFxERVrtW2T8+2bJL5/tKlCiQJUtI5iRvIJ/MmTNnyRJaoniBLl0a9uzRul698iS+iz2F58+f7979KT58SaddR80OFIHp06fXrFmLz4YNGwKVp+ajBJSAElACSiBFBFJTEd4TGZm1QkyRihWKEUrClEEnwce/7Mwena1ChWLlyhWJjMga2KHjS5cuTZw48Zlnnq1fvwF332bNmr/88oB169az/E2KkN1NiYcNG+5FiBw8eLBDh46vv/56YmKi1PpOCVmmdOzZs+eDDz58+OFH6tath800Inp6+PDh7OfXu6lRtC5KQAkogQxLYMuWLT8kbVu3bvUE4fLlyx988MGf/9zXfPiXnakD7dSp04MGvSFF79u3L0WFsgrP11+P5kBq95///IesrIfzKyrFaafN/Km+a4ZyLD9RqB0+qacImR1YvVqpTZsPTJi4ZP+BE1euJDpJMf5l5/79J8aNX7Rp074aNcvgRLTJItlk27dv79nz6ffe++f+/fvLlClTuXKlLFmyLFq0aNq0qVevXpXDjx49ikKaPXt2srml5QR0qYULF77xxhtpwfu4e/du/1mdPHnyL3/5y6OPPjZmzBhOP5nqSzW3bds2alTs22+/c/HiRf9L0RyUgBJQAkrgDhJACw77eNjevfu4R7Pt2bOXf9npalK2bNlefvnl4cOHPfHE43z4wr/sTAXjV69ePWbMt3/9618olE98fDw3I/vlHjlyJFeunBxYpUqV559/vkCB/PaPdZtyxowZokqpvv8ZpqYiDGlwX8VuXRtGRGSdM3fDosVbDhw4efly4s2bt27evMmXAwdOLFoUN/uHNRHhYQ891KRx4yohIYFRhGfPnv33vz+6cuXKsGHDFi5c8O2334wePXrevLnIwXLlYgzljRs3xsbGXr9+3c8WurOHU83Y2K8PHDh4Z82Q0idMmAhSfyxBwffp88KiRYvJJHv27I888sgHHwz9/PPP3ntvSPv27dnjT+Z6rBJQAkpACaQFApMnT0H8PdfruQcf7BYREcmHL/zLztmzf0gLFmIDbrbdu/cgvIz6rFGjhvWdH2nETp/NSA1F6JgpeM89jhDjbOEVKxTt2uW+OrXLHTp0asrUFWvX7o6Pv8JnzZqd301atm/fiTq1Y7p1a1y5UonoKBYpZGTZMcvQz23Hjp2ovSeeeKJRo4ZMWJTcGKQuVqzYU091Dw8P9zN/PdwTgQEDXj5y5KjPopDgf9y6hw8fZlH1Hj16/PDD7Fde+Wvz5s3r1avXunXrt99+iz1du3bNlCk1urG2shJQAkpACQSDALIvIeHKk08+GRER8e233y5evIgPX/iXncePH3PrKXSyxAzmmhFk/Hkytmv24FHbtGmTjDjjWpMEDAHbHKhlwAoPn1tnJDlLWYzPiteQzJcsWSJjxLKTEj/+eNiPP87HgJ9++smM5LJfjp02bZqplGt1rMbznZT8JTfyJKtffvlFMjQD02QoyexvQb+VEjuSNSxLnrzZIyPCHGEkmTOzDGGtWmUf/kOTmjXLrFm7a1TsvK++mrNy1Xb+ffSxZnXqxDDLEN2WKXMm5h3emzdH1qxhRsbZr5g15blzZ/k3W7ZI3w7Xo3wmEBkZ6bMoxHM8ceJ3Emzx9NM9X3ihD1cHJ0vY07Vrlxw51FPocxPpgUpACSiBO0wAL+CDDz6IEceOHecvKpDN+m+ybkL009KlS15//TUGZB944IEFCxZweP369WVst2HDhmZWIrOqcPIxP/6bb74lDb+2a9d27do1dhDgpMiXL59rShFeUlZMTLk5c+ZImoULF7Vp04ZxLb4zXsxQeL9+fe+/v5V1jBvLp0+bjj0cW7Nmze3bd5DYbXWSMnQYzxDZiRMnSNO5c2dyI098W8ZVyRf+JTfKJQbAptgVg4OoCB1aMGuWvHmzN6hfoXXLGtHRkYg8/H3IO8aF8+bNcV+DSp061r948cr5C5cf6NywcaMq+e7NxZiy6D+SIg3btK7dsEFFdGF41iwSmOzDVqRIEZxMGzZsZETV7eES7Dl48Jv8yl8J/GSnJCYkhfY2ISldu3ZjQltCQoI1KyYgEoRBKAajnL17P8/hX3wxwiQ4fvw4093uv781+zl87NixZvKiSSM2mEK97GfC5a5du1555VWCYziEbHGkMWtQwj5atGjJBDs2vvDrHQ9n9lkU8jT2448/wqFOnTqPPfa4/SkENA0N9Mgjj0oAygsvvLBq1Wpr9Ik1tvfs2XOff/65NM0TTzy5YsUK1zgVSdOpU2cJSII8/M0sWE45TmZBzfVi1qxZ7dq1p9zNmzdjPI9ry5evGDDgL1IEYTE9evScO3cueteHnqyHKAEloASUgCuBS5fily1bTrQojjF8Zr/8cp5rrwlAGTNmLD45OQq9iJMvOjqqVKlSTOZjT968eW0iJaXJxxwiHsGWLVvKHvKkdAnjQGsyUxCJhkzk7uC2FCxv2KihTChk3LJSpYpJqsNNdYzx2F+oUCHSeDJbnI7QgImXZK6HB0sRot4YI65apQQLzbS5v2bBArnDwkKsco5B5PDwLMWL5ytTuiAfFqMJDw9jpzER9ZclNKRA/txt29R5sGvDatVKRUdF2H3V3e8rGhMT07hxI27VH330MXd3VwrFixfv1eu5Jk2a8BN/+c6HnfzL/X7IkCFvvDGYL48//jhjl4SkEPT6z3/+00Tgmgx5CHj11YHr1q1jj9F8a9euRQSgKUuVKvnMM89UqlRpxIiRH374b9fD7XRKhMjMmTMRH3jRO3bsiD2FCxdeuXIlHuMsWcLatm3Tvfsf703a+EIt2MN+OzkHL41vohDVxXgxVjVt2tS+F/DQocO9e/emgfbu3cuxnKvIwX79+n355VeuIuz06Z9effXVkSO/ZKYpiXfu3Pl//9ffKbSIIYbu3buTBllPGqJY0Kk06Pfff+8UGoWUHDdu3D/+Mej06dPmte6U27dvXx7spAjCYmi4gQNfGzlypIrC4HU5zVkJKIF0RKB9+3aTJ0/G4CJFCvN3zLcEb4wx/zJ8TIJkq4O3TLx0fHCSERLwzTff8JzPv3jRkj3cToKoqGicc3aCdu3kJmk8KUWn6tifrYgcXLFiJQ5CKk4m9i0hZVAUIaO95coWbte2TutWNcuUKoinEIGI089plRc0H9ut2zhLbiX97sYBiFuRw0uXLtymdZ0OHerFlCuaLTLF0/6ioqLw4jRr1mzSpEkdOnRAkDnF4VavXh1PbPPmzSDCX76zsVNQEn0yc+YMemjfvn/mQ2DKo48+ilPaKewcQfDdd5OY37ZixfKNGzeQkmOPHTv2/vtDMeC///3qiy++YOiT2W/ffTeRzprSqHUx5ueffx43bnyNGtXHjh3DgCylxMaO+vLLkbly5WJYXDRr/qSNL9SCPWlhuNwHUXj48BGpMk9XNvv0uXPnkO/btm0nlvzrr2PXr1/HOALKGB32zTejXVf7GzLk3eLFi02dOmX+/B8HDhzIKUfKmTNnXbjwa/DyoUOH3nzzLbyVPFEQh7Rhw/q5c+cwCoDg+/zz//Cr1TDWwZkxY+b77/9r3bq1dIBatWrx661bNzt37kRjrVmzmsPJhKzYTyk8P9islzVZ0gSbxSnd40NBeogSUAJKIHUIVK1aNXfuPCg/RngYL27arBkfvjgGfL4dU7ZsWRJ4twSttnfPXusIaXz8JQ7BF8jfHTscQ7H+b3jycM5NmjRZ/IL8ZaagZCvj1GwMT3uaa+jWgBIlSsbFxYnK5KYgo8au1bFvPBITA7idkad4RuxvQVGExYrmbdm8WvWqJXPnig4LC3XoviRJeOVy4vXrN1BOFucKXx3/WsUi/zgCkG84htUQiRxNJmRVvVrpVq1q4la0Xz2TMnfu3Ay9v/vuO0gl1uxp27bdV1/912nk1222xJ3wtIEfzvwK6AYNGly+fIUBYusheIYKFixIYut0t7lz55Hs+ed7V65c2STGgYf3jr8+VIQ2xk1VtGhRVKY5nJkNOXPm9CG31DzEiMIJEybYKdftc5gZopWRfafx/fnzF+CgBexrr72G657pB1Bi1SHGnWmvxYuXOLnlGjVq3L9/f5zBdI9u3bp26fIAhtFeSEC+kHjKlKn4KcuXjyFD/Pl0RTJH1nMIafA+WiuCmnzmmadbtGhhHeB+7LHHBg0aVL58eVzLEsxEhBNHcbjMmEnRhhYcO24sHyMK7exJURGaWAkoASWQ+gTwAiL7Ro4YOWXKlMTEBD584d8qVavgzUnWHrTaA10eeOeddyREg6gOUW+M2vFvsofbT8DUPZwUMjz9zjvvxsSURxK0bduWkWIpmmBk/rWfIXbifhI7CYGVUWPX6njKsGLFihJZYhbB4d6HECQ3pE7evCmTGUFRhImJ1+M2Hzh2/OzVq9dF7GWLzJo/X47pM1avX7/nYnwCgs9T9UjPnfjMmQvbtxNhGhKatCQhO69eu37s2JlNcfuuXPl1+UD7xCWlNNvEiRPeeGMQHrVPP/10wIABnhy2TpkzlRCpwRMMY4J43Vgez23pjDhbXbsoThqGMWsC1J3SF6DB8/uyEBEPUiVKFEf6MGrpOhkxpUxSOT2iEC3Luo/BKFdWKCRnaMuIv2zZs0dXqFCeL7t27bx06XdLmLZs2QKTJBkyrkKFCnzB0Xj5suPhksTbtjmWSK1bt651NnGePHlo06QMd1lXoqJBkZ5Orm4S0w14BDSdp2/fflKiBDzppgSUgBJQAhBAEfbt11dWIuTDF/717h0kdoRN6JHejBrLTtSb7OELm+whGV+Yiof7RqKG2SO/2txMwMrgwW/I/D8TzCED1iIDrLaZ76YsqwEmw4eTNsnTbXXEeGtFJBmFomqkRmaxRuJX2EMCa1ne6xgURdixfd3IbOHrN+xdv3HviRNnExOvMUewSaMqxYveu3Tp1unTl+/de/Ty5YTf+QqTZN+1a9fPnDm/ctW2qVOX7dx5pFbNstmyhScmXj1+4sy69bvXrtsVEZ6VtyHbbDa3ybJmzUrbT5kymcFEfDxEhHgKN5HDkaeEKbRqdT/xIp988um+fXsR4EzOc80cQVCoUEHrfhQbcw5wHGbL9j9/nj/Gcywz6vr06YOnitHMNm3aYj9F+Jlnqh3OgtLIQey3UyLjuZKMkXeTHk8bPjbWI+QzaNA/8O2Zn2hHGcadN29ew4aNjAexVq3ao0d/w/4bN27ikLYWzSnkxRIUGxMNScDhZGIyJHOKSOobDoe3yYFGQf9ZM6RLk/KBB7o8/fQzzBxlJivrRLoNVbMDhDTNmjd7/LHH+fBFDrGzx2bmmkwJKAElcMcJIAHxF4rL8A4awxATcSTEpN5BG1K/6KAowjKlCzW+D99nseMnzs5fGLd12yFEYfbsETVrlClQIMfChetHfzNnxYot8ZeuOG6ot9GCTLe6fe36DRapnjx5SWzs7OPHf+NyLzvDm/ilq0H5/244ejRnypWKN6kcZVyZYv4j4mBXXQJ4e5EiRNP4CVD3qWDS7Zjxw5MJVy1aiVhwkw469Spk+shdCC3q+TwuOAYMw/cRmwKkxo/+ujfpUuXZqm/Ll26Ill8C1OQ7u79WIQOMtp/80UOMvfRuOW850ntZAZkXNxm44rDk4eTnPUI2bheBMQw/6vmKQeGAN59dwgxJQxJT5gwftmyZatXr0LI+lMiEtDIQSMKk93jT4l6rBJQAkpACWQEAkFRhAycRUWFx8QUIcoYXbh9x+E589Zv3XZg2fJNW7buI+6YCOL58zd8++3cg4dOJl7ldn/99OlzM2YsRwviIywfU+xi/OUNG3dt2bb/+9mrt2w9UKliiXZt66IIo6IjfFyBxqUxEWrEHzD3y+qCckqFZWvXrmOgs2fPnkwlNEUT2GunczB9koFv8nedsIgU9udtvBjPCDUBJcy0oBaffPLJ0qVL7ZjklKZcubLs2bfvdxMiTRomujHdLV++/P4zT6kcxIaiRYvJMyJhH65BIa6VRR0ya4T9BPyvXLmC2A6nz+jRX6dotmWOHDnEiUiMjmtu7GHOipflzXEQIgGZ9MkQc69evZgcLQLXN+3uQ+PqIUpACSgBJaAE7BMIiiKkeLxlLEydM0e2ypWKN21S+eat69NmLNu771iN6gzYs/Rg1ebNa/z00y+TJi0+ePDEsWOnJ01atH7driqVS93fqnarlrVaNq95/nz8rO9XEmTSvFm1qlVL5soZRdBxyG9vHLFfQy8piTbgV2bmeUojA5EyMG/ScEdnWpgdA6KispUvX4EQVIkesm7sYb91D4PL/IsXzRpmgyTFQ+apLIQacwoJKEbXbt3qmEKX0o35drgAkVyEMDsdS91ZhwURU7WqY8UmfzYf5CDFMT5OrBkG0Eys5ogodFrtxckkxFnZso45FuvXb3CKAvbNeKJSkHEci2OPsKGUZsKcAaGKX9MMPdB5WI0opVlpeiWgBJSAElACwSYQLEWYZLcjpiRLWEiRInkYAo6MyNqqZe06tcvnzZMjKiqiZPGCHdrVL1Qw98mTZw8dPo3a69C+fo0aZXPmjObXmJhizZrWYKGZenUqlCiRL2tWx+vsHCHJvwtKtguHsPBFixZZ5wuSD8vCfffddwxBEkkqGbGQNX/37z9gvDiMb5YoUeLgwQNmZBnHHssBzpr1vZ2ykQIE0fPOlZEjR1gDkwk34Q3LTjnggyxZsuQPP8wxSpGy0GREkFhTsioeAepWDlIvQlUkGcKoaNEiKBhXkedqM0t0sl4RovPtt9+W9fZkI5JmxIgRLKRMUHa5cnYXf3HLxDc5KFkR0kHAFHIKV+Vzz/V69tnniLNds2YNq24OHz6c9x1LULBs6GPifBHWVJxFpGlx1hiCIW8iZ7FoViiU1Q3tbzhicTciSXft2v3aa6+j5MiKDMl29eo177//vlmkxm2e+CxF5dOgzCakmUiP/TKpUTcloASUQMYhkNEm5KWjlrU2TbAU4a+LytzDvPvbzKJj8DRzSKYIXmSX9OIRx3I0IZly5MhWs0a50qUKly5VqH79iqyg4kiW9Dt/WXGGxMQayyH3OFYzdOTmgyhE3xArzlIjvHaC1YbZOnd+gEWG2c96fmYVGFYGQSCOHz+eFUmGDv2AhYjRBMwgxMXDwsX9+79MGMcf/9idMG/WjrHZ3ixKxyFICtbJJAeiwfnL6086dGjvpLQY8WTFaSTOU0/1YPXETz/9DA00ffoMeZmP2U6dOsXEwUcffQwLScNqzH/96yuU0qJFc0mDIqxWrTqqiJhW0rz33ntehAua9emnnya2H40FnG7dHgQOwdRE0iBc2P+nPz1vf2FMVyb+yEFyw7yHHnpw8ODBErHBYtFDhw7905/6sOI0OYvfLnv27GYsGPlOg7IHVystzltbateu07RpMxagYY1oH4bpAUsrcMJQ9PPP/4msyJBsmYSKU9YpTsWp+nTaVq1a0bvw4P7rX+/T/XgjM6P8L730a6yxzS6kyZSAElAC6Z0A9xEVhWmwEWkU6y0+5LWBAwNu5fnzV27dvmVdkZpX1fEGigrli6MCf3tJnUP5sRbhsWM/ZwkLZe4gvjQzXw1XoOOQ3UeYQZgjx2+Bur+5CQlSSZHNxJFQ7evXr+EGO3ny1PnzF3AHslDc3//+N8IXTFYMDbP+CJ4kYpAJ4OWlNAyqItSIkeFfXESsKV2vXl2Owv2DpxD/H+vMyeFr1qzFC9i+fXun8FUqy2IoVapUPXXqJDls3rwF1UJsAVIDDxwHtmvXTuaiUXfGZ3mvCWoGA8iNpUxeffWV+PiLrIFpyqLoLFlC+ZU5aqyESbAt4eWIDCa9mYoQbY53c/369YxuFypUuGnT362J44QOOCgVDmH9P7xZ8GFaZ7Vq1QgBYf6cddVDDmQ5QLyYVrO9N8SxY0effPIJm6EkbrMCC2PBRGbgQCXqnGl5suYOGBs1asQb6kBkGpHEVOT+++8HO4vI4NKTlLz1BGnLfD7pYLt375ZlRVk7WqYeyua6n3yYy9ikSWPilFmoiPmgdCQcq7QaWhwXIBki+JjESd8giNi0pmRIqFrdunXwKdLxULcIRFY+ornpPPxq2tSTPSnq5JpYCSgBJZCWCXANZLEI3dIUAafXw2aKv3gh4H1o9uz1JUsWyJE9G28ckcyJFJ4ybVmXzg2LFLn3VwuIL75969y5i3PmruW2yitJcufObmJ1CTFGKU6dvqxb1ybFiv5vSerr124kJFyNKf+/9aIDbrxmqASUgBJQAkpACSiBjEYgKKPG02cun79g/f4DJ1hN+pa7xajxuFy6lLB7z7H5Czbu2n10564j8xds2L37aPylBH5Kmn+Iz4wXlvz6YjtGinnZCfKRgOWp05dntEbS+ioBJaAElIASUAJKIKgEgqIIT5/+ZcXK7TNmroiL23v5SuKv87eSdB4rBPN6urNnLy5fuXXa9GWr1+zgO59Vq3fiEVy+fMvZsxcI7GA02fEGO8cwMYfcvnH95vHjZxYs3Dhj1sp163cFlYhmrgSUgBJQAkpACSiBjEYgKIoQiMxFI4J41uxVU6ctO3L4NCtUMw3/xs1bFy5eXrdh97jxC5B3vM7k2rUbQhwX4MmT5xYu2jR23ALeTUIy0YXsRy8uWhw3dtz81at38HY7H+IDMlqjan2VgBJQAkpACSgBJZAiAkGZR9il2yAxggmCBBgxd7BUyYLbdxxq3LDqiZNntm0/FB9/xTE67G4j3Dg6OoKAkiKF8y1fuaVWzZgjR07v2XsMTWnehjxtyuAUVVITKwEloASUgBJQAkpACXghEBRF+NgT7yQkXPtNFDp0IToPPRcenhVhh5PP+woypGfJmfCIMBJzIH5E60qELGEzbszr2qhKQAkoASWgBJSAElACgSIQlFHjZk2rG/t+fWfxtRsowitXEh1jwcmtMk0CUl++7EjsqiCtmQeKguajBJSAElACSkAJKIGMTCAoPkKAfjHi+8VL4oynMCCI8Q4iB3v36hCQ3DQTJaAElIASUAJKQAkoASEQLEWofJWAElACSkAJKAEloATSC4GgjBqnl8qrnUpACSgBJaAElIASUAIQUEWo3UAJKAEloASUgBJQAhmdgCrCjN4DtP5KQAkoASWgBJSAElBFqH1ACSgBJaAElIASUAIZnYAqwozeA7T+SkAJKAEloASUgBJQRah9QAkoASWgBJSAElACGZ2AKsKM3gO0/kpACSgBJaAElIASUEWofUAJKAEloASUgBJQAhmdgCrCjN4DtP5KQAkoASWgBJSAElBFqH1ACSgBJaAElIASUAIZnYAqwozeA7T+SkAJKAEloASUgBLQ9xprH1ACSkAJpFcCQz9ckV5ND6bdA/o3DGb2mrcSuDsJqI/w7mxXrZUSUAJKQAkoASWgBOwTUEVon5WmVAJKQAkoASWgBJTA3UlAFeHd2a5aKyWgBJSAElACSkAJ2CegitA+K02pBJSAElACSkAJKIG7k4AqwruzXbVWSkAJKAEloASUgBKwT0Bjje2z0pRKQAkogbRFQGON3bbHXRlrvHLlyvvuuy9t9b+0Z83AVweePXfWaldkRORHH3/kv6VvvvnWsWNHyado0aLVq9do2bJFZGSk/9mmqRxUEaap5lBjlIASUAIpIKCKMOMowl69eo0YMSIFnSMNJJ2ZtHk3pFPSFgxjjx49+tmnnyEQfeNmxKVoyrNnz+bJkwc7yXb+/AVxcXGPPPJwkDS6Vdc+/PAjrVq1DAYf1zxVEaYOZy1FCSgBJRB4AqoIVREGvlcFLkdU7EcffeTFl3blypWXXnrJN8Xm3UyRg31e6PPWW2/5nD9+2QkTJiYkXHHNgfyHDv3AH1HoJJfz5M4z5L0h1kqNGhWL7kQOBkkxuwLUeYSB6/uakxJQAkpACSgBJWAh4H1oNUgDr0YOMsLrc2ugVidOmDhgwMtucyBnfkIvksy3IlCEyGW0pmyucpBsU807KFUIriKcMmUKjwiy8d03aql51IoVK7788qtr166lZqFuy7Kig96ePXtOnjw55N0h/CU9dqYaT4BQnDHSaobsxBISXLp0aciQ97DTk3kk899mmgZ73LYRNuBpFz4+b6618y0raupkDHyGDx/up3m+GePlKOFpTlIfOr/brpia/dO1dnRCUyP6JOTvCPw7BaFz5ypvDGrXvXtdK5kX+jR22uNDXypZMk///s3J34djnQ4hE7IiQ/+z8j8HzkrOVtNn5Hrrf7aag5WAFa98T3Y02WeAAZGDlL5gwYJq1auj/PDeuTUmaUJhdZL5bKonQYx3kDx79uzhc86+HRgsRSj6AJuM/s2ZMyc7fbMyqEeJoJEiGjZs+Oyzz4SFhQW1RJuZP/XUU4ZeuXLlChYsOPC1gfy1eXigklWoUP706dMmtwMHDhw8dJC/sgdJce7cL/fee29UVNTAga9ip6dyuyVt/lsVERHx808/HTp0yJoVXWvp0mW+ZW69cwcQcoGCBVetWpVSk6y9MaXH+px+wIAB9LRPPvmEHNatW+dzPmnhQABOnjzlww8/lHPnwQe7nThxIi0Ylpo2XL12o0D+6GpVC6eo0ICoxhSVmHYSFypcyPSZwYMHj/rvKP8fX9NO7dKCJeZeZr4EbyQUOcVgsT/eQSG2aZNjxJYvTt47K08SkCywhK1yEMXJ5lv+ixct5mM9Ntk9QVGEqITx4yc0adLYqgBatGiBaPCtYnrUHSSA2tu9e4+oeVp2585dlSpVNhqRybbMsShUqFCqWZiQkBCZLdu2bdusJW7evBk7uaynmhnJFlS2bFm4pSNnAw9CTuo/2TqmtQSIe55PXn65v7nU8Iji5SklrdkfKHuuXr3Bp1GjUoHKMEPlw2Ph6397/fjx42nNo5+hWsGfyv7jH3+3ysEePXr4lhuRxcnKShJIAHKgNifvIPkna4PbohF/Y8eN5WNEoZ09oYGqhjUfUQnVqlVzm3nSCM4nBw86nEwlS5b6859f5PLNzlGjRhG2M+m7SUQGyX5uUaNHf4OylGs6csT8y4126NCh7MSd27dfX85hyaFSxUrjJ4xv27YtYpSHvDlz5pCmbt163bv/kdy4YXz99ddiFX6REiVKkOHatWv4d9bMWeQTHx+Pq0kSS3HyqylFdtaoUX3evB+pgtlPGpO5qVRg2UoFH3roISc3oSuKwBqD2ouKygYZmknG09u1azt37lzsYQ/OwsKFC8tP1saSustOvoAU5xM6MiBuwkaNGjLhl+u1oKCUQ4cO00+wyjB32xyurEwnoavQJaisQCamzFNDWztG7969scS1UTAjR47sOKjwV0kPd+oMxhL2S3e1Ziu9kdq5bVzXjh2QnkaDbty4kbpIbk4ni/UclJNCTitTtLWtrfa4Pd9N35CsvGC0XzV5XKEbePLx4ywc9vEwc3mRRnGtpttrkSQ2deHEf+gPD9H0PXv2NJ1f6iKt6WR2qkEw5a5de7hZ87IMzs6YsdXJGHyH7TtUzBrmuPjjTZz9/Y6L8Yldu1bNHh2Or//vf2uzfMWBRYv2cmzNGkVIc/PmLdkj+YRlCWHAl8R837jpmMmfUelSv40CHzh4dvTotZLe035jFb7J7DnCMWPzluNWU6tXL3zqVPypUxed7C9QIHv58vkXL/7VHvs9xH5K2pTLGhc3ucJYOwlDNwwlSVZcgqRH8V32B+ouQNeKjY11NZjBVqedyJ0ghbvax2UnpdVyn+M8nAqyuRxPuuAjVaNG/E39wWIDNiiKEPUQERHp9rosV0au2owwypmGN1HuK5cuXcb7OvjNwXznZjxv3jwurDgt8AbJ3UgGCpFx3CZlYIjzlu/ffz/b5HD+wnnpbezHW8BAGGYcPnyYPdwwriZelT2Ui/IjK8aIc+fOlT9/fjnJsVzQyO2Nn0xusbFfi0jlV+Sg3Oa5N0vpiGDupmLSqVOn7JwhAUnjFkVgjbFeHLmnwgRuuXPnEY2IyIOe27oYhgFRgdYioqOja9asyZis5EzHwHGYN29ek4b2RRyYtpa+5JYV+7HfSFWniQ2uDS2dk25Jz+E7HeDEcY+DkvTbmJhyUrrVfixhWIrBKe43QgmDZcaCtTe6NZjKOnVs/zuSPFyxcVczItv1ZHGq+4YNG0zRntray/luH6PNCmIDD6L0Dbfp3V5e3F4TPF2LpC6ofJpV6kue5lohXUL203BWx2RqQjB1P3U6fvv2U5UqFTh86JxVaYkcPH78gig25FrLVuWmTt3y4YeLUGbxl67KfuQgx7KfY/leo0YR+p1kXqFCfhGIzZuXrV+/RHx8It/Jp3DhHJJeihAx6mm/sZNCs4aHjh+/8eDB360hR4K4uONt21aIi7vHKgqRg+wkvc1e4XMyuSxwuNws5NouTclwBO2LHIwdFWv8EQcPHmRPoO4CiBhXHZMeV58x/AOlAq0Nimg2lJg7iHcN76DPLe56YJEiRcnWu4uOBCQLVKFO7c70Vi8D1t4Lbda8mSRI0ZegjBp7MRRJwelUp04dSYMfkYs4CobvOKI6dGiP5GJDMnLb4/JaqlQpvPdyn0YactnlV76QQJ7aUSdMLDM5NGjQwJT+888/i0+rePHikm2Lli1E0pEt5XqJIBE3Z+vWrSU3SsFsMyGJu4KUTnEmn0vxl0RQFihQICDj47gzZQauzI53S9UTisAaU7lyZQQWuCiOCyUMIyLCeYDGKloHmG5tmzVrFvom4HJQyjIdA6u4Xls9Q06+IvoYfQlTPbHy0l1dG9rJ/00P8T5UTQLX4Scs6dipo2gv6e2C18kSTwY7dWwv9tv8SeYRsnELlOlTbk8WeSQzJ2+tWrXMU5+ntvZ0vqcUo82KeEnm9vLi6ZrgNrHUhUuB8OFiRTK+W+sirek0peFOQUCQXbyQWK3672YTFi+RmwHlZcv2C6vNccdDQzLziOeErmiRnKhGkZJbt564eeOWSbN5ywnxF/KX/IsWzUWASN682RCgkp6/HEsOnvabslo0L4scREe6ykFJM2fOTjyFqED518jBxMTr/ncJOznIxcRcB7iwm/blibRJ0yZyFrO/ShVHwE1gL7x2LEz7aXwOxbVfNQklCbhrjcFA1h30bgYJSGbf1BSldFpqO0XHkhgtaOSgHJvsnqAoQh7TPektbmaoBHMjSdIWkcYz51phzje891xSuaNzX+fuLqEMRi29+OKLS5Ysds2BZzhO4/79+1tDPk0Q4qBBg+T53tPm5ObETszGeE/psbNHzx6MIAQwTs1EluBPdSsxPaEIuDHSoDRBQkKi6D/RiNwLcRbKop1OG4OwNFPHjh1T2oltppeOwfRB14mMYKGl8HuJnqYP7N+375xjS77bJFu6F/+322NpONyZOJKN4JNWQ1uY9G7PF0+N67ZjJ2u2zQToV1HPpHc9WZxOXpOnl7b2dL6nFKMd+5O9mLjNxP41wVP1qcvWrVvpZtLf6HjyNGuKS00ITnXcsfMUrjuceWZ/zpwRVxNvGAXGePGNm7eik4aAzYaSQ6gxBEzMMp+nutfNlSvSKY0kxqfIX0aQkZU4C00O588nkEPpUnnd7pcQY47Klz96wfw9nuSg5GZEYSrLQRn9cHU8c+bKOeJ0FmNqwC+8drp9Gk/DoDaL9r3U76UPhn6AS2/mzFny+eyzz1nYJSDGByqy2NWYli1bshwg+Xuyk59IQLKAVCQtZBIURYhEQOe5DfGT08l6ucTD52mgRwAhPnjmlvFK7q8izoxXQ3wbbiePs5Of8Orj28efz6UfZxIjiexkwE6e7z1tbm/S1ru464FcDnDwMrjAiHbqxBN4QRFYY6RB45IiqkT/CZ/t23fgLHQ7PYDZVDQTI2heHLF+ngA4aJk+uHDhIiSXVTFjT7FixWhi6zpP7LHZbZK1yrjoHHfEeDzDyUTQi1Nt9WrHJDM2t08XCGsnjF4a16ljJ2uw/QRUh2YlvduTxfXklZy9tLWX8z2lGJOtBcRkkkmyKU2CFF0TOMp67XI0fdJTJedC06bN5MIim9N6BakJwanuuPFw1zHmGxr666VetJp12Rf8f1YxRw5INFQjcwTfGPyD+bjOR3TUPSorf93KSnLYf+CMq9w0epSjfjodz/hysjHRIgplsDh1vIPcL/Bz4oBw+5ghdyK3PoLAXnjt9+Q0m5JhUEZyeeEHoyJcscuV4+HkNh9eAXfk6BH/F6AJnhwEKUvDsAA1itatKGQnMhfHZJCWVLwjbRoURShDJzwrW9exW7hwIc9VzNznTmBWuOALM8DcOpkMDg7hQoyYQxrKTr6guryvZcMkJ4kU43odFe0Y4bU+qSeNeHrzEYoGYgaYlMidg7hRLxG1jpjSpCWsqLt34RjYZnaLIuDGyL2WkB2j/+CDiNkcF2caxbVejBcHVRRiA53nyJEjTjFMWFuiRHGrW85+t0m2daQP4JuUlIwcXbzoPPPdKRMZYVy2dKmZcQg0Ykekf6KYMRWDXYW128Z17djJ2mw/AdWROCG3J4vTyYslRu57amtP57sPGO3Ugp7AeWpdVdGcC24PT9E1Ae84zmYZOpe5CpKn9EMvq/akMgSnmsoAMU4+2c+0wqxZQxs3Li3/8iUkNLOZI2iOPXrsPPMI3Wq1MmXyiqBkpiARIYw7oyDPnLls0nMU38nB035TysIkwWpTFMbGrkkdOUifYRCpTZs24oDg0mduN9x0+C4XPetZzH78xAG/8Nrp8+klTcxvm7yzjv/69OnDkOvu3bv9qYK8lcS3aFw75aJo0XyIQhycRhfyhX/ZycCgz0vDSOlehtRTYbTdlUAQ32JnDa+jYBOiZd1vooCdAmnl2V1ifjmWuU2IQvMve6zBX5IJ12hrKK41lhOHIm4Va7k80587d1biBCVejDy9xBqb8GGZOW7Cnzl20qRJ5IPDwCnozE5v85KGKpt4F0lmRUT1TTCEKwoGUgNrDKULTyEp9siEaxNIayVjzJOd3Edhiwr3P9bYiT9W4ROSqYpOXcgE5PKTCf90ZUUHMx3DNdbYtaFNh5EZHp6CZF2bj6JNBLHhKSRdoxelN+JvcDUYRWICQazN4Vt/E54SJMtmPR/NggDWk8V6EgnVZNva7flOWdY4zYDEGhsC1qb3dHGQywvVd60m+ThdScy1yBr6bY01drrWSbtYT9LgQXB9ix1CDdFmnZzHqHGjhqUOH/lFokasscY46kxKSUYCCRyxxghLMn4iJPnC+YRChXKEhGR2ikG2pvcUg2z2W40kuIQYZ+shvnVm61ED+v8aDmwnK2tXtJ4F5li3cfdOZzGNjvch4Bdeq/3pOrLEbUMgBxk+5qePP/7ITks5penX7yUZ0zBbkCKvEWcsQ03kqyw0QygJcwcZLPbTO5jsS5+D98ZnT7SDqAh9aGA9RAmkLwLmkSAgsUTpq+4BtDY9YnR6avWfhm8Q9L3GbsmnSBH633apk4PNxVZSx5hAlcI8PGaO4TIMVIaajz8EgjJq7I9BeqwSSC8EZMBXhlnTi81p0M70iFFGD2Xpg4AgTY8QAlJxzcQ+gXS0rp79SjHqqnLQPq5gp1QfYbAJa/53FQGnYVa3yxHfVRUOTmXSI0ZP02B8JhQQCOojzDg+Qp97mh6oBGwSUEVoE5QmUwJKQAmkOQKqCFURprlOqQalWwI6apxum04NVwJKQAkoASWgBJRAgAiojzBAIDUbJaAElECqE3DyEbKgdKqbkCYKZN1Eqx13ZWRJmgCtRtzVBNRHeFc3r1ZOCSgBJaAElIASUAI2CKgitAFJkygBJaAElIASUAJK4K4moIrwrm5erZwSUAJKQAkoASWgBGwQCMo8wjvy9hUbldUkSkAJKAEloASUgBJQAv8jYF6+EhRFeOPGDYWtBJSAElACSkAJKAElkMYJhIaGioU6apzGW0rNUwJKQAkoASWgBJRA0AkExUcYdKu1ACWgBJSAElACSkAJKIHAEVAfYeBYak5KQAkoASWgBJSAEkifBFQRps92U6uVgBJQAkpACSgBJRA4AqoIA8dSc1ICSkAJKAEloASUQPokoIowfbabWq0ElIASUAJKQAkogcARUEUYOJaakxJQAkpACSgBJaAE0icBVYTps93UaiWgBJSAElACSkAJBI6AKsLAsdSclIASUAJKQAkoASWQPgmoIkyf7aZWKwEloASUgBJQAkogcAT+HzWEEVpi4oqFAAAAAElFTkSuQmCC" />
    </p>
    <p>Has several areas and different options about how each could be implemented.</p>
    <p>
      <img src="data:image/png;base64,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" />
    </p>
    <p>
      How does the user expect to navigate this? It looks a bit similar to a breadcrumb-like
      control, but the final element isn't focusable. So should we follow the ARIA recommendations
      for breadcrumbs or do something else? Both 'Stardust UI' and the '...' menu are actionable, so
      one approach is for focus to first land on 'Stardust UI', and then when you press{' '}
      {code('Tab')} to move to '...'. Alternatively, this could be regarded as one control and you
      would navigate within the control using arrow keys / {code('Enter')} / {code('Escape')} and
      pressing {code('Tab')} would move you to the next area. When you land on the control in both
      cases the screen reader needs to give context and announce the team and channel and that there
      are options available.
    </p>
    <p>Similarly, the controls</p>
    <p>
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKsAAAA7CAIAAACL7O0NAAAAAXNSR0IArs4c6QAAAAlwSFlzAAASdAAAEnQB3mYfeAAABEBJREFUeF7tWz1s2lAQDhULjGUNY9OxZoQpLRmTFdRMsDDQAaRmaIZmCEM6gESGUoklTKlgpWNQMrGGlTVEajvQqq1ExvYjT7Vcfmzz/I7YfffkgTjnz3fffXfvhyT06+ePDR4aM/BI49g59CkDrADddcAKYAXozoDu8XMPYAXozoDu8XMPYAXozoDu8XMPYAXozoDu8XMPYAXozoDu8XMPYAXozoDu8XMPYAXozoDu8XMPYAXozoDu8XMPYAXozoDu8XMPYAXozoDu8XMP0F0Bof/g/wUO3xyOv42tmYxGovXTuvfcHh9Xbm9HwInH44aRSKdfRKNR77C+QlCvgO79sA9y735QEDEajRrvGxBEs9mUwDfFJDQ0Ho9jsRhwAHtx0RsMBtlsJpVKSSA7PmLVcSaT3dlJOz6ixEC9AgqFQr1et6mVyWRSLpflMmQfs0h/8VWxUqlI4/f7/Xa7c3c3mUcAfrVa8yKCmfKIPY6dvDuxBnV21oLOkH6iCpknkGQdYN8qiRqpmX50bOnigDo77c7BweuFCEDGr6APmMm9AgpAeUBbYsynH7Brq34RAokCBDSawcxwnB3kaBVdWlS/l/QDp9frPTMMgKA6l4nAMAyYSbu6rABQ/cDM53PSyHIPEirAVLr5ga6zgT7v6QeD19fTDowPM9VpJRcGMJOje9lT1vRDYRhy+FeXV7iszzreIVSAXAxyTx0dvbVWfy4nWUlY+Tt2ERiIDYKqMVP9wHf0YeGrkezzj+e4TBG4uUOoAOsUoIosLNPcQBEt1928elUbEdH6m7/pJ6ECrLPAqrwss2+1ppOlGJj7sV9XhSxwNjfjgLXHhAHMVL0XYrWmH3tCaeTt59v7L/dx4YMAcXOHRAHSS2X3wYuln/LSSSQM7Pvt3YABzNy7upLlzNHWSs+KlJvpN0Vgf0e9AjAHY9NcLpVr1RpKttv9JK5G4wM2WquGtNBe1cp/HjydTmM7btMG8CsYwExJIH4AUa8AtDWsy3Cgtru3m0wmt7aebGz8xoUj1ZvRjfcNIV36kQ9s1XDgAwUvFAFuQtZoPERHGg8iCPUKMMN4+neIM2D8VCwW0UKHw6GXUJXs+20cEBMzRIAGZuoAH/AjbubyOemtmnipzRS5htlzPnD1p8L22UX6MR3A5lTqm5tSqYzzWusrMOlQrPyRDBz7YN8vNn5Y+mHuR/P3WP2OX5rQfWOyLC/rVgD8wDwaiUTQErx0An5WFQMPoABVrjOOEgYI1wFK/GMQagZYAdQM+x2fFeD3DFH7xwqgZtjv+KwAv2eI2j9WADXDfsdnBfg9Q9T+hb5++Uz9Dsb3IQPm4Wbo+79/ae9DX9klCgbC4bCA5VmAgt4gYfKpcJCyReEr9wAKVoOEyQoIUrYofGUFULAaJExWQJCyReErK4CC1SBhsgKClC0KX1kBFKwGCZMVEKRsUfj6B3lYy//lH+0fAAAAAElFTkSuQmCC" />
    </p>
    <p>
      could be implemented as separate controls, so you would navigate between them with{' '}
      {code('Tab')}. Or they could be grouped together to behave as a toolbar. The first approach
      has advantages that blind users would have awareness of all the controls available to them,
      but at the expense of having to press {code('Tab')} multiple times to move around the
      application.
    </p>
    <p>
      These types of decisions are ultimately what will make the application easy or hard for users
      to navigate - and although Stardust make this easier to change than pure html implementations,
      it is still costly in terms of developer time to correctly make these types of changes later.
    </p>
    <p>
      Our strong recommendation here is to have clear accessibility designs and example user flows
      as early in the design process as possible.{' '}
    </p>

    <Header as="h2" content="Keyboard Navigation" />
    <p>
      The ability to navigate and interact with the application without a mouse is something that
      most now take for granted. It's often easier for users to select a particular item in a list
      using arrow keys, rather than attempting to select with the pointing device for example.{' '}
    </p>

    <Header as="h3" content="Tabbing and arrow key navigation" />
    <p>
      The {code('Tab')} key is used to move between focusable elements, and many users are familiar
      with this behaviour as they, for example, move between fields in form using {code('Tab')}.
      This is provided by the browser and for simple applications may be sufficient.
    </p>
    <p>
      However, for complex applications, particularly those which display large amounts of
      actionable data on the screen the number of 'focusable' elements can become huge and the
      process of moving between them with {code('Tab')} becomes unusable. This can be solved by
      breaking the application up into 'Zones', and the user navigates with the {code('Tab')} key
      between the zones, and between the actionable elements with navigation keys. Stardust uses
      Focus Zones both within it's own library components and as a component that can be added by
      the user.
    </p>

    <Header as="h3" content="Focus Zones" />
    <p>
      Focus zones allow the Tab navigation to be broken down into smaller parts, so that user can
      use the {code('tab')} key to navigate between higher level components (for example tool bars,
      menus, lists) and use arrow key navigation within these higher level components (buttons in a
      toolbar, items in a list).
    </p>
    <p>
      Stardust leverages Focus Zone component which is based on the
      {link(
        'Focus Zone from Office UI Fabric',
        'https://developer.microsoft.com/en-us/fabric#/components/focuszone',
      )}
      . This component allows to wrap any focusable component/element and adds arrow key navigation
      functionality.
    </p>
    <p>There are two basic use cases for Focus Zone:</p>
    <ul>
      <li>
        Stardust components - for example, {code('Menu')} component uses {code('FocusZone')}{' '}
        internally to add arrow key navigation.
      </li>
      <li>
        Stardust component wrappers - for example, it is possible to combine {code('Accordion')}{' '}
        with {code('List')}
        and wrap them in a {code('FocusZone')} to get the chat list experience:
      </li>
    </ul>
    <CodeSnippet
      label="App.jsx"
      value={`
        const App = () => (
          <FocusZone><Accordion panels={[{}]} /></FocusZone>
        )
      `}
    />
    <p>{code('FocusZone')} operates based on DOM structure to:</p>
    <ul>
      <li>Focus the next or previous element after pressing a navigation key</li>
      <li>
        Remember the last focused element within the zone by using
        {link('Roving tabindex', 'https://www.w3.org/TR/wai-aria-practices/#kbd_roving_tabindex')}
      </li>
    </ul>
    <Header as="h3" content="Advanced keyboard navigation scenarios" />
    <p>
      There are some advanced scenarios, in particular within the chat pane, where users need more
      structured navigation. They need to be able to select a message first using arrow keys and
      then might want to interact with the message itself (press 'Like' button, edit the message,
      open collapsed message). Stardust will enable this multi-level navigation - user will be able
      to press {code('Enter')} and {code('Escape')} to go in and out of the subcomponent navigation.
    </p>

    <Header as="h4" content="Focus indicator" />
    <p>
      When a user is navigating through the application using the keyboard, it's important to make
      the element that currently has focus clearly visible, so the users can see where they are on
      the page. This is handled in Stardust by focus indicator functionality. Focus indicator will
      be displayed only if the application is in keyboard mode. Application switches to keyboard
      mode when a key relevant to navigation is pressed. It disables keyboard mode on mouse click
      events.
    </p>
    <p>
      The implementation and requirements on the consuming application/experience are work in
      progress.
    </p>

    <Header as="h4" content="Virtual Screen Reader Navigation" />
    <p>
      Screen readers use different mode of keyboard navigation. They allow the user to navigate
      using their virtual navigation methods and/or list different types of elements (headings,
      buttons, menus). Every screen reader has its own implementation of virtual navigation, but
      they all operate based on the ARIA roles and attributes. Stardust will render these attributes
      based on the {link('accessibility behaviours', '#_Accessibility_Behaviours')} of the
      component. Users can override these and provide their own roles and attributes by changing the
      behaviour applied.
    </p>

    <Header as="h3" content="Right Click Support" />
    <p>
      For cases when right click is used to execute a secondary action (for example, a context
      menu), a keyboar shortcut needs to be provided to allow the keyboard / screen reader users to
      execute the secondary action. Also, screen reader has to make the user aware about the
      presence of the secondary action.
    </p>

    <Header as="h3" content="Elements that appear on hover over another element" />
    <p>
      Tooltips, popups and similar elements might appear only when the trigger element is hovered by
      mouse. Users using keyboard or screen readers to navigate are not able to hover the trigger
      element. Therefore such elements need to be visible also when the trigger element is in
      focused state.
    </p>

    <Header as="h2" content="Accessibility Behaviours" />
    <p>
      In Stardust, accessibility behaviours encapsulate keyboard navigation and screen reader
      navigation. They essentially add ARIA roles, ARIA attributes and event handlers. The idea is
      to compose visual components and apply a behaviour on top of them to achieve desired keyboard
      or screen reader navigation.
    </p>
    <p>
      Each relevant component comes with its default accessibility behaviour. For some components
      there will be additional behaviours to choose from. In addition to that, user can create
      custom behaviours and use them instead of the standard ones.
    </p>
    <p>
      Users are also able to add or override attributes generated by the accessibility behaviours if
      customization is needed.
    </p>
    <Header as="h3">Example: Menu component</Header>
    <CodeSnippet
      value={`
        const items = [
         {key: "editorials", content: "Editorials"} ,
         {key: "review", content: "Reviews" },
         {key: "events", content: "Upcoming Events" },
        ]

       const menu = <Menu items={items} />
      `}
    />
    <p>
      Default accessibility behaviour for {code('Menu')} component is {code('MenuBehavior')} (
      {code('MenuItemBehavior')} for the menu items). These behaviours add appropriate ARIA roles by
      default:
    </p>
    <p>Rendered HTML:</p>
    <CodeSnippet
      mode="html"
      label="App.jsx"
      value={`
        <ul role="menu" class="ui-menu ">
          <li class="ui-menu__item " role="presentation">
            <a class="ui-menu__item__anchor " role="menuitem" tabindex="0">Editorials</a>
          </li>
          <li class="ui-menu__item " role="presentation">
            <a class="ui-menu__item__anchor " role="menuitem" tabindex="0">Reviews</a>
          </li>
          <li class="ui-menu__item " role="presentation">
            <a class="ui-menu__item__anchor " role="menuitem" tabindex="0">Upcoming Events</a>
          </li>
        </ul>
      `}
    />

    <Segment inverted>
      <Header>Children API vs Shorthand API</Header>
      <p>
        Note that if Children API is used (rather than the Shortcut API), Stardust does not modify
        the children components in any way. For example, if content of {code('Menu.Item')} is
        provided as a child component, no behaviours are applied on these children. Consider the
        following example:
      </p>
      <CodeSnippet
        value={`
          <Menu>
            <Menu.Item>Editorials</Menu.Item>
          </Menu>
        `}
      />
      <p>Rendered HTML:</p>
      <CodeSnippet
        value={`
          <ul role="menu" class="ui-menu">
            <li class="ui-menu__item" role="presentation">Editorials</li>
          </ul>
        `}
      />
      <p>
        Notice that Stardust only applies role only on the {code('<li>')} element which it rendered.
        The {code('Menu.Item')}
        "Editorials" component that was passed to Stardust is not modified in any way and thus
        doesn't have the role applied.
      </p>
      <p>Proper accessible menu implementation in this case would be:</p>
      <CodeSnippet
        label="App.jsx"
        value={`
          <Menu>
            <Menu.Item content="Editorials" />
          </Menu>
        `}
      />
      <p>
        This way, Stardust will generate a child component based on the provided content string and
        will apply the role to it:
      </p>
      <CodeSnippet
        value={`
          import React from 'react'
          import { Menu } from '@stardust-ui/react'

          const items = [
            { key: 'editorials', content: 'Editorials' },
            { key: 'review', content: 'Reviews' },
            { key: 'events', content: 'Upcoming Events' },
          ]

          const MenuExamplePrimary = () => <Menu defaultActiveIndex={0} items={items} primary />

          export default MenuExamplePrimary
        `}
      />

      <p>And this is the HTML that will be rendered:</p>
      <CodeSnippet
        label="html"
        value={`
          <ul role="menu" class="ui-menu a ab c d e f g">
            <li class="ui-menu__item ..." role="presentation">
              <a class="ui-menu__item__anchor ..." role="menuitem" tabindex="0">Editorials</a>
            </li>
            <li class="ui-menu__item ..." role="presentation">
              <a class="ui-menu__item__anchor ..." role="menuitem" tabindex="0">Reviews</a>
            </li>
            <li class="ui-menu__item ..." role="presentation">
              <a class="ui-menu__item__anchor ..." role="menuitem" tabindex="0">Upcoming Events</a>
            </li>
          </ul>
        `}
      />
    </Segment>

    <Header as="h4" content="Overriding behaviours" />
    <p>
      User can override the default behaviour by using the {code('accessibility')} attribute, as
      well as override generated attributes:
    </p>
    <CodeSnippet
      label="App.jsx"
      value={`
        <Menu accessibility={TabListBehavior}>
          <Menu.Item role="tab">
            Conversation
          </Menu.Item>
        </Menu>
      `}
    />
    <Header as="h4" content="Available Behaviors" />
    <p>
      The default and other available behaviors for all the components can be found in the
      {link('documentation', 'https://stardust-ui.github.io/react/')}, together with notes on other
      accessibility considerations for using the component. The examples show the recommended way of
      using the components in the different variations - it is possible to edit example's code, see
      the rendered HTML, change themes and validate the rendering in RTL scenario, or with different
      behaviors.
    </p>

    <Header as="h2" content="Screen Readers" />

    <Header as="h3" content="Textual Representation" />
    <p>
      There are multiple ways ({code('aria-label')}, {code('aria-labelledby')}, {code('title')} to
      set the text that is announced by screen readers. Many times, the correct text will be read by
      the reader without any additional work. However, if you do need to customize behaviour, then
      ARIA attributes can be passed to components as properties.
    </p>
    <p>
      There are cases when passing of the attributes is required. For example an icon-only button
      needs to have textual representation. It depends on the use case which attribute needs to be
      used:
    </p>
    <ul>
      <li>
        {code('title')} attribute represents the text that is shown as a tooltip on hover, screen
        readers also read this text when the element is focused
      </li>
      <li>
        {code('aria-label')} allows the user to add custom text that the screen reader will read on
        focus. There might be scenarios where the information read by the screen reader needs to be
        different than the information that comes from the visual representation of the
        component/element
      </li>
      <li>
        {code('aria-labelledby')} is similar to {code('aria-label')}, but is only a reference to a
        different element present in DOM.
      </li>
    </ul>
    <p>
      Stardust does not do any assumption and does not try to use the most appropriate option from
      these three. Instead, it is up to the user to decide which option fits best.
    </p>
    <p>Example:</p>
    <CodeSnippet
      value={`
        <Button icon="book" aria-label="Confirm booking" primary />
      `}
    />
    <p>Rendered HTML:</p>
    <CodeSnippet
      mode="html"
      value={`
        <button class="ui-button" aria-label="Confirm booking">
          <span class="ui-icon" color="white"></span>
        </button>
      `}
    />

    <Header as="h3" content="Set Size and position for virtual list" />
    <p>Under investigation.</p>

    <Header as="h3" content="Live regions" />
    <p>Under investigation - will probably be a Stardust component.</p>

    <Header as="h2" content="High Contrast" />
    <p>
      There will be a standard high contrast theme. Additionally, the DocSite can be used to test
      individual components work in HC mode and achieve sufficient clarity for partially sighted.
    </p>

    <Header as="h2" content="Zoom" />
    <p>Stardust components are tested zoomed up to 200%.</p>

    <Header as="h1" content="Contributing" />
    {link(
      'Accessibility contributing guide',
      'https://github.com/stardust-ui/accessibility/blob/master/CONTRIBUTING.md',
    )}

    <GuidesNavigationFooter
      previous={{ name: 'Quick Start', url: 'quick-start' }}
      next={{ name: 'Theming', url: 'theming' }}
    />
  </DocPage>
)
