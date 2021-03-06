import styled from "styled-components";
import mq from "@Utils/media-query";

export default styled.h2`
	font-size: 22px;
	margin-top: 0;
	font-weight: 600;

	${mq.mdUp`
    font-size: 28px;
  `};
`;
