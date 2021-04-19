import Head from "next/head";
import React from "react";
import styles from "../styles/Home.module.css";
import WinesList from "../components/WinesList";
import ProteinsList from "../components/ProteinsList";
import AddProtein from "../components/AddProtein";


export default function Home() {
  return (
    <div>
        {/* <WinesList /> */}
        <ProteinsList />
        {/* <AddProtein /> */}
    </div>
  );
}
