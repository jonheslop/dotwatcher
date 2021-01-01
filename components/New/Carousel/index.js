import React, { Fragment } from "react";
import Image from "next/image";
import styled from "styled-components";
import {
	CarouselProvider,
	Slider,
	Slide,
	ButtonBack,
	ButtonNext
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

const CarouselStyles = styled.div`
	.button {
		appearance: none;
		background: transparent;
		border: none;
	}
`;

const Buttons = styled.nav`
	width: 100%;
	text-align: center;
`;

const Carousel = ({ children, ...props }) => {
	const count = React.Children.count(children);

	if (count <= 1) {
		return children;
	}

	return (
		<Fragment>
			<CarouselStyles>
				<CarouselProvider
					naturalSlideWidth={25}
					naturalSlideHeight={25}
					totalSlides={count}
					infinite
					// isIntrinsicHeight
					{...props}
				>
					<Slider>
						{React.Children.map(children, (child, ind) => (
							<Slide index={ind}>{child}</Slide>
						))}
					</Slider>

					<Buttons>
						<ButtonBack className="button button-prev">
							<Image
								src="/static/icons/carousel-arrow-left.svg"
								width={45}
								height={45}
								priority
							/>
						</ButtonBack>
						<ButtonNext className="button button-next">
							<Image
								src="/static/icons/carousel-arrow-right.svg"
								width={45}
								height={45}
								priority
							/>
						</ButtonNext>
					</Buttons>
				</CarouselProvider>
			</CarouselStyles>
		</Fragment>
	);
};

export default Carousel;
