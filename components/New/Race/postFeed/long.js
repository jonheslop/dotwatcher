import PropTypes from "prop-types";
import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import shortcodes from "remark-shortcodes";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import Embed from "./embed";
import Link from "next/link";
import widont from "@Utils/widont";
import quotes from "@Utils/quotes";

import {
	Image as BodyImage,
	ShortCode,
	Link as MarkdownLink
} from "@ComponentsNew/Markdown";

const H1 = styled.h1`
	${tachyons}
`;
const Div = styled.div`
	iframe {
		max-width: 100%;
	}
	img {
		max-width: 100%;
	}
	a:link {
		color: var(--blue);
	}
	a:hover {
		color: var(--light-blue);
	}
	${tachyons}
`;
const A = styled.a`
	${tachyons}
`;
const Button = styled.button`
	border: 0;
	padding: 0;
	appearance: none;
	background-color: transparent;
	${tachyons}
`;

class Long extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showMore: false
		};
		this.toggleMore = this.toggleMore.bind(this);
	}

	render() {
		const host = typeof window !== "undefined" ? window.location.host : "";
		const contineRegEx = RegExp(/\[\[\s?continue\s?\]\]/, "gi");
		const shouldSplitText = contineRegEx.test(this.props.data.body);
		let splitText = null;
		let continueReading = null;
		let moreText = null;
		let showLess = null;

		if (shouldSplitText) {
			const splitTextMarker = this.props.data.body.match(contineRegEx)[0];
			splitText = this.props.data.body.split(splitTextMarker);
			continueReading = (
				<Button near_black hover_blue underline_hover onClick={this.toggleMore}>
					▼ Continue reading
				</Button>
			);
			showLess = (
				<Button
					near_black
					hover_blue
					underline_hover
					mt3
					onClick={this.toggleMore}
				>
					▲ Show less
				</Button>
			);
			moreText = this.state.showMore ? (
				<ReactMarkdown
					source={splitText[1].trim()}
					plugins={[shortcodes]}
					escapeHtml={false}
					renderers={{
						shortcode: ShortCode,
						link: MarkdownLink,
						image: BodyImage
					}}
				/>
			) : null;
		}

		return (
			<React.Fragment>
				{this.props.data.image ? (
					<img url={this.props.data.image.url + "?w=800"} />
				) : null}
				<H1 f2 fw6 lh_title mt0>
					<Link href={`/post/${this.props.id}`} passHref>
						<A link near_black hover_blue>
							{quotes(widont(this.props.data.title))}
						</A>
					</Link>
				</H1>
				<Div lh_copy pb3>
					<ReactMarkdown
						source={
							shouldSplitText ? splitText[0].trim() : this.props.data.body
						}
						plugins={[shortcodes]}
						escapeHtml={false}
						renderers={{
							shortcode: ShortCode,
							link: MarkdownLink,
							image: BodyImage
						}}
					/>
					{this.state.showMore ? null : continueReading}
					{moreText}
					{this.state.showMore ? showLess : null}
				</Div>
			</React.Fragment>
		);
	}

	toggleMore() {
		this.setState(prevState => ({ showMore: !prevState.showMore }));
	}
}

Long.propTypes = {
	data: PropTypes.object.isRequired,
	id: PropTypes.string.isRequired
};

export default Long;
