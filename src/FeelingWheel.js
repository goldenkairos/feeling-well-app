// https://observablehq.com/@mbostock/emotion-wheel@225
function _1(md){return(
  md`# Emotion Wheel
  
  This is a recreation of [Geoffrey Roberts’s *Emotion Wheel*](https://imgur.com/a/CkxQC) using D3’s [partition layout](https://github.com/d3/d3-hierarchy/blob/master/README.md#partition). Robert’s 2015 work appears to be based on a vocabulary wheel by [Kaitlin Robbs](https://lifehacker.com/find-the-perfect-word-for-your-feelings-with-this-vocab-1653013241) from 2014, which in turn appears to be based on [*The Feeling Wheel*](http://journals.sagepub.com/doi/abs/10.1177/036215378201200411) published by Gloria Willcox in 1982.`
  )}
  
  function _chart(partition,data,d3,DOM,width,color,arc)
  {
    const root = partition(data);
  
    const svg = d3.select(DOM.svg(width, width))
        .style("width", "100%")
        .style("height", "auto")
        .style("font", "10px sans-serif");
    
    const g = svg.append("g")
        .attr("transform", `translate(${width / 2},${width / 2})`);
    
    g.append("g")
        .attr("fill-opacity", 0.6)
      .selectAll("path")
      .data(root.descendants().slice(1))
      .enter().append("path")
        .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
        .attr("d", arc);
  
    g.append("g")
        .attr("pointer-events", "none")
        .attr("text-anchor", "middle")
      .selectAll("text")
      .data(root.descendants().slice(1))
      .enter().append("text")
        .attr("transform", function(d) {
          const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
          const y = (d.y0 + d.y1) / 2;
          return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
        })
        .attr("dy", "0.35em")
        .text(d => d.data.name);
  
    return svg.node();
  }
  
  
  function _data(treeify){return(
  treeify(`
  Fearful
    Scared
      Helpless
      Frightened
    Anxious
      Overwhelmed
      Worried
    Insecure
      Inadequate
      Inferior
    Weak
      Worthless
      Insignificant
    Rejected
      Excluded
      Persecuted
    Threatened
      Nervous
      Exposed
  Angry
    Let down
      Betrayed
      Resentful
    Humiliated
      Disrespected
      Ridiculed
    Bitter
      Indignant
      Violated
    Mad
      Furious
      Jealous
    Aggressive
      Provoked
      Hostile
    Frustrated
      Infuriated
      Annoyed
    Distant
      Withdrawn
      Numb
    Critical
      Skeptical
      Dismissive
  Disgusted
    Disapproving
      Judgmental
      Embarrassed
    Disappointed
      Appalled
      Revolted
    Awful
      Nauseated
      Detestable
    Repelled
      Horrified
      Hesitant
  Sad
    Hurt
      Embarrassed
      Disappointed
    Depressed
      Inferior
      Empty
    Guilty
      Remorseful
      Ashamed
    Despair
      Powerless
      Grief
    Vulnerable
      Fragile
      Victimized
    Lonely
      Abandoned
      Isolated
  Happy
    Optimistic
      Inspired
      Hopeful
    Trusting
      Intimate
      Sensitive
    Peaceful
      Thankful
      Loving
    Powerful
      Creative
      Courageous
    Accepted
      Valued
      Respected
    Proud
      Confident
      Successful
    Interested
      Inquisitive
      Curious
    Content
      Joyful
      Free
    Playful
      Cheeky
      Aroused
  Surprised
    Excited
      Energetic
      Eager
    Amazed
      Awe
      Astonished
    Confused
      Perplexed
      Disillusioned
    Startled
      Dismayed
      Shocked
  Bad
    Tired
      Unfocused
      Sleepy
    Stressed
      Out of control
      Overwhelmed
    Busy
      Rushed
      Pressured
    Bored
      Apathetic
      Indifferent
  `)
  )}
  
  function _treeify(){return(
  function treeify(source) {
    const parents = [];
    const nodes = source.trim().split(/\n/g);
    parents.push({children: []});
    for (let i = 0, n = nodes.length; i < n; ++i) {
      const depth = nodes[i].match(/^\t*/)[0].length;
      const parent = parents[depth];
      if (!parent.children) parent.children = [];
      parent.children.push(parents[depth + 1] = {name: nodes[i].slice(depth)});
    }
    return parents[0];
  }
  )}
  
  function _partition(d3,radius){return(
  data => d3.partition()
      .size([2 * Math.PI, radius])
    (d3.hierarchy(data).count())
  )}
  
  function _color(d3,data){return(
  d3.scaleOrdinal().range(d3.quantize(d3.interpolateRainbow, data.children.length + 1))
  )}
  
  function _width(){return(
  932
  )}
  
  function _radius(width){return(
  width / 2
  )}
  
  function _arc(d3,radius){return(
  d3.arc()
      .startAngle(d => d.x0)
      .endAngle(d => d.x1)
      .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
      .padRadius(radius / 2)
      .innerRadius(d => d.y0)
      .outerRadius(d => d.y1 - 1)
  )}
  
  function _d3(require){return(
  require("https://d3js.org/d3.v5.min.js")
  )}
  
  export default function define(runtime, observer) {
    const main = runtime.module();
    main.variable(observer()).define(["md"], _1);
    main.variable(observer("chart")).define("chart", ["partition","data","d3","DOM","width","color","arc"], _chart);
    main.variable(observer("data")).define("data", ["treeify"], _data);
    main.variable(observer("treeify")).define("treeify", _treeify);
    main.variable(observer("partition")).define("partition", ["d3","radius"], _partition);
    main.variable(observer("color")).define("color", ["d3","data"], _color);
    main.variable(observer("width")).define("width", _width);
    main.variable(observer("radius")).define("radius", ["width"], _radius);
    main.variable(observer("arc")).define("arc", ["d3","radius"], _arc);
    main.variable(observer("d3")).define("d3", ["require"], _d3);
    return main;
  }
  