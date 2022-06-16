import 'package:smart_bucket/constants.dart';
import 'package:smart_bucket/controllers/MenuController.dart';
import 'package:smart_bucket/screens/login/login.dart';
import 'package:smart_bucket/screens/main/main_screen.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(MultiProvider(providers: [
    ChangeNotifierProvider(create: (_) => MenuController()),
  ], child: MyApp()));
}

class Navigate {
  static Map<String, Widget Function(BuildContext)> routes = {
    '/': (context) => const MyLogin(),
    '/MainScreen': (context) => MainScreen(),
  };
}

class MyApp extends StatefulWidget {
  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  // This widget is the root of your application.
  bool Auth = false;

  @override
  void initState() {
    // TODO: implement initState
    checkAuthentication();
    super.initState();
  }

  checkAuthentication() {
    Auth = true;
  }

  @override
  Widget build(BuildContext context) {
    String Routing() {
      if (Auth == false) {
        return '/';
      } else {
        return '/MainScreen';
      }
    }

    return MaterialApp(
      initialRoute: Routing(),
      routes: Navigate.routes,
      debugShowCheckedModeBanner: false,
      title: 'Smart Bucket',
      theme: ThemeData.dark().copyWith(
        scaffoldBackgroundColor: bgColor,
        textTheme: GoogleFonts.poppinsTextTheme(Theme.of(context).textTheme)
            .apply(bodyColor: Colors.white),
        canvasColor: secondaryColor,
      ),
      /* home: MultiProvider(
        providers: [
          ChangeNotifierProvider(
            create: (context) => MenuController(),
          ),
        ],
        child: MainScreen(),
      ), */
    );
  }
}

class LoginScreen extends StatelessWidget {
  const LoginScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(child: Text("LOGIN SCREEN"));
  }
}
