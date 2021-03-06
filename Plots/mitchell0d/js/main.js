require.config({
	paths: {
		calculator: "calculator",
		form: "form",
		 mediator: "../../commonJs/mediator",
        plots: "../../commonJs/plots",
        pointBufferAnalyzer: "../../commonJs/pointBufferAnalyzer",
        s1s2Analyzer: "../../commonJs/s1s2Analyzer",
        utility: "../../commonJs/utility"
    },
});

require(["settings", 
 "mediator", 
 "form", 
 "calculator", 
 "pointBufferAnalyzer",
 "s1s2Analyzer",        
 "plots"], function initialize(
    settings, 
    mediator,
    form, 
    calculator, 
    pointBufferAnalyzer,
    s1s2Analyzer,
    plots) {

    /*
     * Initialize the default settings for the plot
     */
     settings.initialize({
        formSettings: {
            displayV: true         
        }, 

        calculationSettings: {
            pointBuffer: {
                bufferSize: 4     
            }
        }
    });

    /* 
    * array to store all analyzers used in the model
    */
    var analyzers = [pointBufferAnalyzer, s1s2Analyzer],

    /* 
    * gets plot settings
    */

    plotSettings = settings.getSettings();


    /*
     * Initialize a calculator
     */
     calculator.initialize(plotSettings);


    /*
     * Initialize a point buffer analyzers
     */
     analyzers.forEach(function(analyzer){
        analyzer.initialize(plotSettings);
    });


    /*
     * Add analyzers in calculations post initialization
     */
    analyzers.forEach(function(analyzer){
        calculator.addAnalysisFunction(analyzer);
    });

    /*
     * Initialize the plot
     */
     plots.initialize(plotSettings);

    /*
     * Initialize a mediator with the calculator
     */
     mediator.initialize(calculator, plots);

    /*
     * Initialize a form
     */
     form.initialize(
            plotSettings,
            mediator
        );

    /*
    * perform calculations
    */
     form.updateCalculations();
 });