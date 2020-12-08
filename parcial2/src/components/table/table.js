import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { FormattedDate, FormattedMessage } from "react-intl";
import detectBrowserLanguage from "detect-browser-language";
import * as d3 from "d3";
//import Tweet from "./row";

export default function TableParc() {
  let [tweets, setTweets] = useState([
    {
      abilities: ["Overgrow"],
      detailPageURL: "/us/pokedex/bulbasaur",
      description:
        "Hay una semilla de planta en su parte posterior desde el día en que nace este Pokémon. La semilla crece lentamente",
      weight: 15.2,
      weakness: ["Fire", "Flying", "Ice", "Psychic"],
      number: "001",
      height: 28,
      collectibles_slug: "bulbasaur",
      featured: "true",
      slug: "bulbasaur",
      name: "Bulbasaur",
      ThumbnailAltText: "Bulbasaur",
      ThumbnailImage:
        "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png",
      id: 1,
      type: ["Planta", "Veneno"],
    },
  ]);

  useEffect(() => {
    if (!navigator.onLine) {
      if (localStorage.getItem("Tweet") === null) {
        setTweets("Loading...");
      } else {
        setTweets(localStorage.getItem("Tweet"));
      }
    } else {
      console.log(detectBrowserLanguage());
      var n = detectBrowserLanguage().startsWith("es");
      var i = detectBrowserLanguage().startsWith("en");
      if (n) {
        const URL = `https://gist.githubusercontent.com/jhonatan89/e379fadf8ed0f5381a2d8f8f3dea90c3/raw/e2bc20df02828d297f99558551e37959ac97a6f8/pokemon-es.json`;
        fetch(URL)
          .then((res) => res.json())
          .then((res) => {
            //console.log(res.data.results[objetos[0]].name);
            setTweets(res);
            localStorage.setItem("Tweet", res);
          });
      } else if (i) {
        const URL = `https://gist.githubusercontent.com/jhonatan89/2089276d3ce0faceff8e55fc3459b818/raw/30ee1a77b3e328108faaaa9aaac6f2ddaa3d3711/pokemons-en.json`;
        fetch(URL)
          .then((res) => res.json())
          .then((res) => {
            //console.log(res.data.results[objetos[0]].name);
            setTweets(res);
            localStorage.setItem("Tweet", res);
          });
      }
    }
  }, []);

  let handleClick = (item) => {};

  let renderTweets = () => {
    return (
      <Container fluid className="m-0 w-100">
        <Row>
          <Col sm={12}>
            <h1 id="title">Most wanted Pokemons</h1>
            <Table id="elements" responsive>
              <tbody>
                <tr className="thead-dark">
                  <th key={1}>#</th>
                  <th key={2}>
                    <FormattedMessage id="Image" />
                  </th>
                  <th key={3}>
                    <FormattedMessage id="Name" />
                  </th>
                  <th key={4}>
                    <FormattedMessage id="Description" />
                  </th>
                  <th key={5}>
                    <FormattedMessage id="Height" />
                  </th>
                  <th key={6}>
                    <FormattedMessage id="Weight" />
                  </th>
                  <th key={7}>
                    <FormattedMessage id="Type" />
                  </th>
                </tr>
                {elements}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <Button id="buttonCanvas" onClick={() => drawChart()}>
              Draw Chart
            </Button>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <div id="canvas"></div>
          </Col>
        </Row>
      </Container>
    );
  };

  const elements = tweets.map((item, i) => (
    <tr key={i + 1} onClick={() => handleClick(item)}>
      <td>{item.id}</td>
      <td>
        <Image
          thumbnail
          src={item.ThumbnailImage}
          className="img-fluid img-thumbnail"
          alt={item.name}
        ></Image>
      </td>
      <td>{item.name}</td>
      <td>{item.description}</td>
      <td>{item.height}</td>
      <td>{item.weight}</td>
      <td>
        {item.type.map((item2, i2) => (
          <Badge variant="secondary" key={i2 + 1}>
            {item2}
          </Badge>
        ))}
      </td>
    </tr>
  ));

  const drawChart = () => {
    const width = 700;
    const height = 500;
    const margin = { top: 10, left: 80, bottom: 40, right: 10 };
    const iwidth = width - margin.left - margin.right;
    const iheight = height - margin.top - margin.bottom;

    const canvas = d3.select("#canvas");

    const svg = canvas.append("svg");
    svg.attr("width", width);
    svg.attr("height", height);

    let g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const y = d3.scaleLinear().domain([0, 1102]).range([iheight, 0]);

    const x = d3
      .scaleBand()
      .domain(tweets.map((d) => d.name))
      .range([0, iwidth])
      .padding(0.1);

    const bars = g.selectAll("rect").data(tweets);

    bars
      .enter()
      .append("rect")
      .attr("class", "bar")
      .style("fill", "steelblue")
      .attr("x", (d) => x(d.name))
      .attr("y", (d) => y(d.height))
      .attr("height", (d) => iheight - y(d.height))
      .attr("width", x.bandwidth());

    g.append("g")
      .classed("x--axis", true)
      .call(d3.axisBottom(x))
      .attr("transform", `translate(0, ${iheight})`);

    g.append("g").classed("y--axis", true).call(d3.axisLeft(y));
  };

  return <div>{renderTweets()}</div>;
}
