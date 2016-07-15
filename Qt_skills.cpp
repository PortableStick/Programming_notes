/* Strings
================================ */
{
  QCoreApplication a(argc, argv);

    QString early_msg (QObject::tr("Suck it, Trebeck!\n"));

    QTextStream out_stream(stdout);
    QTranslator translator;
    bool result = translator.load("trans_fr"); //Loads the translator file created in Qt Linguist
    if(!result)
    {
        out_stream << "ERROR: translation file didn't load!\n\n" << endl;
        //QtL outputs a binary file, .qm, that must be placed in the same directory as the executable.
    }
    else
    {
        a.installTranslator(&translator);
    }
    QString msg1 = QObject::tr("Hello, I like cheese!");
    QString msg2 (QObject::tr("Goodbye, I'm off to eat some cheese now!"));

    out_stream << early_msg << msg1 << "\n\n\n" << msg2 << endl;
    //"Suck it, Trebeck!"
    //"Bonjour, j'aime fromage!"
    //"Au revoir, je vais a manger du fromage maintnent"
    //
    //The first line did not get translated even though we created the string correctly and correctly invoked the translator becuase the translator ran after the string was created.
    return a.exec();
}

/* Signals and slots
================================ */

//Qt uses the concept of signals and slots to describe the communication between widgets in the view and the actions they invoke.  For instance, a button can send a clicked() signal to the close() slot of the main window, which will result in the window closing.  This is easily done in Qt Creator's design mode, but can also be assigned programmatically.
