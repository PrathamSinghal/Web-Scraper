
export const extractCsvDataFromSection = (e) => {
  let dataArray = [["Company","Description","Facebook","Linkedin","Twitter","Address","Phone","Email"]];
  let allDocs = e;
  if(allDocs) {
    for(let i=0; i<allDocs.length; i++) {
      let thisDocs = allDocs[i];
      let tempArray = [];
      tempArray.push(thisDocs?.companyName || "N/A");
      tempArray.push(thisDocs?.description || "N/A");
      tempArray.push(thisDocs?.facebook || "N/A");
      tempArray.push(thisDocs?.linkedin || "N/A");
      tempArray.push(thisDocs?.twitter || "N/A");
      tempArray.push(thisDocs?.address || "N/A");
      tempArray.push(thisDocs?.phone || "N/A");
      if(thisDocs?.emails) {
        if(thisDocs?.emails.length>0) {
          tempArray.push(thisDocs?.emails[0]);
        } else {
          tempArray.push("N/A");
        }
      } else {
        tempArray.push("N/A");
      }

      dataArray.push(tempArray);

    }
  }
  return dataArray;
}