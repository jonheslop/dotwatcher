import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';
import Homepage from './homepage';
import ImageRightLeft from './image-right-left';
import RacePromo from './race-promo';
import Box from './box';
import EmailSignup from './email-signup';
import IconLeft from './icon-left';
import Basic from './basic';
import Image from '../image';

const Div = styled.div`${tachyons}`;

const ContentBlock = ({block}) => {
	if (block.layout === 'Homepage') {
		return <Homepage block={block}/>;
	}
	if (block.layout === 'Race promo') {
		return <RacePromo block={block}/>;
	}
	if (block.layout === 'Box') {
		return <Box block={block}/>;
	}
	if (block.layout === 'Email signup') {
		return <EmailSignup block={block}/>;
	}
	if (block.layout === 'Icon left') {
		return <IconLeft block={block}/>;
	}
	if (block.layout === 'Image left' || block.layout === 'Image right') {
		return <ImageRightLeft block={block}/>;
	}
	if (block.layout === 'Image') {
		return (
			<Div ml5>
				<Image data={block.image.fields}/>
			</Div>
		);
	}
	return <Basic block={block}/>;
};

ContentBlock.propTypes = {
	block: PropTypes.object.isRequired
};

export default ContentBlock;
