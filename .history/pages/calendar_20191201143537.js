import React from "react";

import Head from "next/head";
import Page from "../components/shared/page";
import Header from "../components/header";
import Footer from "../components/footer";

class Calander extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Page>
				<Head>
					<title>Calander – DotWatcher.cc</title>
				</Head>

				<Header title="dotwatcher.cc" />
				<h1>Hello</h1>
				<Footer />
			</Page>
		);
	}
}
