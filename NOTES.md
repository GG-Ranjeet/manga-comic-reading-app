Yep. **We found the problem.**

You're running:

```text
Java 25.0.3
Gradle 9.3.1
```

and Gradle is explicitly using Java 25:

```text
Daemon JVM: C:\Program Files\Java\jdk-25.0.3
```

Your `$env:JAVA_HOME` is empty, so `java` is being picked up from your Windows `PATH`.

The `restricted method in java.lang.System` error is happening during the Android native/Prefab configuration, so **Java 25 is the first thing I'd change**.

### Do this: use JDK 17

For your Expo/React Native Android project, JDK 17 is the safest choice.

First check whether you already have JDK 17 installed:

```powershell
Get-ChildItem "C:\Program Files\Java"
```

If you see something like:

```text
jdk-17...
jdk-17.0.x
```

then don't install anything. We'll just point the project to it.

If you **don't** have JDK 17, tell me and I'll give you the cleanest way to install it.

---

### If JDK 17 already exists

For the current PowerShell session, run:

```powershell
$env:JAVA_HOME="C:\Program Files\Java\jdk-17"
$env:Path="$env:JAVA_HOME\bin;$env:Path"
```

Obviously, replace `jdk-17` with the **exact folder name** you actually have.

Then verify:

```powershell
java -version
```

You should get something like:

```text
java version "17.x.x"
```

Then:

```powershell
cd D:\project\MobileApp\second-project\android
.\gradlew.bat -version
```

You want:

```text
Launcher JVM: 17.x
Daemon JVM: C:\Program Files\Java\jdk-17...
```

### Then clean the Android build

Once Java 17 is confirmed:

```powershell
.\gradlew.bat --stop
.\gradlew.bat clean
```

Then go back to the project root:

```powershell
cd ..
npx expo run:android
```

---

**Don't delete your NDK again yet.** Your stacktrace shows the failure is happening inside `GeneratePrefabPackages` while Gradle is configuring the CMake builds for both `react-native-screens` and `react-native-worklets`, not because Gradle simply cannot find the NDK. 

If you run:

```powershell
Get-ChildItem "C:\Program Files\Java"
```

and paste the result, I can give you the **exact commands for your machine**, without guessing the JDK path.
